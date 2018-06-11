// $('.card').hide("fast");
$(document).ready(function () {
  var fahrenheit, celsius;
  var weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather";
  var apiKey = "0e63f730e5627c7012970b7b8f4d63fe"; //<weather-api-keys



  $("#btn").click(function () {

    getWeatherData(weatherApiUrl, apiKey);
    $('.card').show("slow");

    document.getElementById("myForm").reset();
  });

  /* function to get weather data from the user's location */
  function getWeatherData(weatherApiUrl, apiKey) {
    var place = $('.city').val();

    $.ajax({
      url: weatherApiUrl,
      type: 'GET',
      dataType: 'json',
      data: { q: place, APPID: apiKey },
      success: function (data) {
        console.log(data);
        var temprature = data.main.temp;
        celsius = temprature;
        fahrenheit = celsius * 1.8 + 32;
        var country = data.sys.country;
        var pressure = data.main.pressure;
        var humidity = data.main.humidity;
        var icon = data.weather[0].icon;
        var weatherDetail = data.weather[0].main + ", " + data.weather[0].description;
        var wind = data.wind.speed + "," + data.wind.deg;

        console.log(temprature, place, country, pressure, humidity, weatherDetail);
        weatherDisplay(place, country, weatherDetail, temprature, icon, wind, pressure, humidity);
      },
      error: function (err) {
        alert('Oops something went wrong, Please try again.');
        console.log(err);
      }
    });
  }
  $(".dropdown-item").on("click", function () {
    getWeatherData(weatherApiUrl, apiKey);
  });


  function weatherDisplay(place, country, weatherDetail, temprature, icon, wind, pressure, humidity) {

    $('#cityName').html(place + " " + country);

    $('.iconpic').attr('src', 'http://openweathermap.org/img/w/' + icon + '.png'); //update the icon based on weather

    $('.temp').append(temprature + "&#8451;"); //update the temprature
    $('.humidity').append(humidity);
    $('.pressure').append(pressure);
    $('.wind').append(wind);
    $('.weatherDetail').html(weatherDetail); //update weather description in html
  }

});

