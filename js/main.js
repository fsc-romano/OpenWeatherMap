$(document).ready(function() {

  var location = 'rome,it';
  var weatherData;

  /*$.get( url, function( weatherData ) {
    displayWeather(weatherData);
  }, "json");*/

  $.get( 'http://api.openweathermap.org/data/2.5/forecast'
       , {q: location, mode: "json", units: "metric", appid: "076624e580dbe089f568ead7737662c4" }
       , function( weatherData ) {
    displayWeather(weatherData);
  }, "json");

  function displayWeather(weatherData){

    $("#title").html(weatherData.city.name + ", " + weatherData.city.country);
  
    for (var x = 0; x < weatherData.cnt; x++) {

      var weatherDisplay = $('#tr' + (x + 1))[0];

      $(weatherDisplay).html( "<th class='datetime'>" + cnvDate(weatherData.list[x].dt) + "</th>"
                            + "<th class='datetime'>" + cnvTime(weatherData.list[x].dt_txt) + "</th>"
                            + "<td>" + cnvTemp(weatherData.list[x].main.temp) + "</td>"
                            + "<td class='td-description'>" + "<img src='" + "http://openweathermap.org/img/w/"
                            + weatherData.list[x].weather[0].icon + ".png' alt='' height=50 width=50></img>"
                            + " " + weatherData.list[x].weather[0].description + "</td>"
                            );
    }
  }

  function cnvTemp(tempWeather) {

    return (parseInt(tempWeather) * 9/5) + 32;
  }

  function cnvDate(jsonDate) {

    var date = new Date(jsonDate * 1000);
    return date.toString().substring(0, 16);
  }

  function cnvTime(jsonTime) {

    return jsonTime.substring(16, 10);
  }
});