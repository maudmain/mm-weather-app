// declare queryables

// API key
const API = "5e1d2997c137aaf57841dd7d335e490e";

// global variables

// page load function- show search history

// event listener
$("#search-button").on("click", function(event){
    event.preventDefault();

    clear();
    
    const cityQueryURL = "http://api.openweathermap.org/geo/1.0/direct?q=bristol&limit=1&appid=5e1d2997c137aaf57841dd7d335e490e";

    $.ajax({
        url: cityQueryURL,
        method: "GET"
      }).then(weatherQuery);    
});

function weatherQuery(response){
    console.log(response)

    let lat = response[0].lat
    let lon = response[0].lon
    const weatherQueryURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API}`

    const fiveDayQueryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&cnt=5&appid=${API}`
   
    $.ajax({
        url: weatherQueryURL,
        method: "GET"
      }).then(weatherDisplay);

      $.ajax({
        url: fiveDayQueryURL,
        method: "GET"
      }).then(fiveDayDisplay);
}

function weatherDisplay(response){
    console.log(response);

    let currentWeather = $("<div class='current-weather>");
    $("#weather-container").append(currentWeather );

    let currentdate = moment().format("L");

    let cityName = $("<h2>").text(response.name + ' (' + currentdate + ')');
    let iconCurrent = response.weather[0].icon;
    console.log(iconCurrent)
    let currentWeatherIcon = $("<img>").attr('src', "https://openweathermap.org/img/w/" + iconCurrent + ".png")

    let currentTemp = $("<p>").text('Temp: ' + response.main.temp + 'C')
    let currentWind = $("<p>").text('Wind:' + response.wind.speed + ' meter/sec');
    let currentHumidity =$("<p>").text('Humidity: ' + response.main.humidity + '%') ;

    $("#weather-container").append(cityName,currentWeatherIcon, currentTemp, currentWind,currentHumidity );
}

function fiveDayDisplay(response){
    console.log(response)

}

// Function to empty out the articles
function clear() {
    $("#weather-container").empty();
  }