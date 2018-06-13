$('.card').hide("fast");
$(document).ready(function () {

  $('#F').change(function (e) {
    temp = fahrenheit + "&#8457";
    $(`.temp:eq(${index})`).html(fahrenheit + "&#8457");
  });

  $('#C').change(function (e) {
    temp = celsius + "&#8451";
    $(`.temp:eq(${index})`).html(celsius + "&#8451");
  });

  var fahrenheit, celsius;
  var weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather";
  var apiKey = "0e63f730e5627c7012970b7b8f4d63fe"; //<weather-api-keys
  var place;
  var index;
  var xhr = {
    url: weatherApiUrl,
    type: 'GET',
    dataType: 'json',
    data: { q: place, APPID: apiKey },
    success: function (data) {
      var { main: { temp, pressure, humidity }, sys: { country }, wind: { deg, speed }, weather: [{ description, icon }] } = data;
      celsius = Math.round(temp - 273);
      fahrenheit = Math.round(celsius * 1.8 + 32);
      var wind = speed;

      weatherDisplay(place, country, description, celsius, fahrenheit, icon, wind, pressure, humidity);
    },
    error: function (err) {
      alert('Oops something went wrong, Please try again.');
      console.log(err);
    }
  };

  userIpLookUp();
  function userIpLookUp() {
    index = 0;
    $.ajax('http://ip-api.com/json')
      .then(
        function success(response) {
          var country = response.country;
          place = response.city;
          console.log('User\'s Location Data is ', response);
          console.log(place, country);

          console.log(xhr);
          xhr.data.q = response.city;
          $.ajax(xhr);
          $('#currentCity').show();
        },

        function fail(data, status) {
          console.log('Request failed.  Returned status of',
            status);
        }
      );
  }

  $("#btn").click(function () {
    index = 1;
    place = $('.city').val();

    xhr.data.q = place;
    $.ajax(xhr);
    $('#otherCities').show("slow");
    document.getElementById("myForm").reset();
  });


  function weatherDisplay(place, country, description, celsius, fahrenheit, icon, wind, pressure, humidity) {
    var dUrl = 'http://openweathermap.org/img/w/' + icon + '.png';

    var currentDate = new Date().toDateString();
    var currentTime = new Date().toTimeString();
    console.log(icon)
    console.log(`.cityName:eq(${index})`);
    $(`.cityName:eq(${index})`).html(place + " " + country);
    $(`.date:eq(${index})`).html(currentDate);
    $(`.time:eq(${index})`).html(currentTime);
    $(`.iconpic:eq(${index})`).attr('src', dUrl); //update the icon based on weather
    $(`.temp:eq(${index})`).html(celsius + '&#8451'); //update the temprature
    $(`.humidity:eq(${index})`).html('Current Humidity:  ' + humidity);
    $(`.pressure:eq(${index})`).html('Current pressure:  ' + pressure);
    $(`.wind:eq(${index})`).html('Current Windspeed:  ' + wind);
    $(`.weatherDetail:eq(${index})`).html(description); //update weather description in html
  }

  $('#input').keypress(function (e) {
    if (e.which == 13) {
      index = 1;
      place = $('.city').val();
      $('#otherCities').show("slow");
      xhr.data.q = place;
      console.log(xhr);
      $.ajax(xhr);
      document.getElementById("myForm").reset();
    };
  })


});

