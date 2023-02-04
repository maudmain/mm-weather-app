// declare queryables

// API key
const API = "5e1d2997c137aaf57841dd7d335e490e";

// global variables
let currentDate = moment().format('L')
let searchArray = JSON.parse(window.localStorage.getItem("storedSearches")) ?? [];

function showHistory() {

}


// page load function- show search history
$(document).ready(function () {
  showHistory();
})

// event listener for the city search click
$("#search-button").on("click", function (event) {
  event.preventDefault();

  clear();
  cityInput();

});


// function for the city input
function cityInput() {
  const citySearchInput = $("#search-city").val().trim();

  // adds the last input at beginning of the array and returns the new length of the array
  // if it's not already in the list
  if (searchArray.indexOf(citySearchInput) !== 0) {
    searchArray.unshift(citySearchInput);
    localStorage.setItem("storedSearches", JSON.stringify(searchArray));
    // console.log(searchArray)
  };

  // empties the container
  $("#search-history").empty();

  // for loop to create a new button element 
  for (i = 0; i < 5; i++) {
    let cityEl = $("<button id='searched-city'>").addClass('btn-secondary btn');
    cityEl.text(searchArray[i]);
    $("#search-history").append(cityEl);
  }

  const cityQueryURL = `http://api.openweathermap.org/geo/1.0/direct?q=${citySearchInput}&limit=1&appid=${API}`;

  $.ajax({
    url: cityQueryURL,
    method: "GET"
  }).then(weatherQuery);
}

function weatherQuery(response) {
  console.log(response)

  let lat = response[0].lat
  let lon = response[0].lon
  const weatherQueryURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API}`

  const fiveDayQueryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API}`

  $.ajax({
    url: weatherQueryURL,
    method: "GET"
  }).then(weatherDisplay);

  $.ajax({
    url: fiveDayQueryURL,
    method: "GET"
  }).then(fiveDayDisplay);
}

function weatherDisplay(response) {
  console.log(response);

  let currentWeather = $("<div class='current-weather>");
  $("#weather-container").append(currentWeather);

  let cityName = $("<h2>").text(response.name + ' (' + currentDate + ')');
  let iconCurrent = response.weather[0].icon;
  let currentWeatherIcon = $("<img>").attr('src', "https://openweathermap.org/img/w/" + iconCurrent + ".png")

  let currentTemp = $("<p>").text('Temp: ' + response.main.temp + '°C')
  let currentWind = $("<p>").text('Wind: ' + response.wind.speed + ' meter/sec');
  let currentHumidity = $("<p>").text('Humidity: ' + response.main.humidity + '%');

  $("#weather-container").append(cityName, currentWeatherIcon, currentTemp, currentWind, currentHumidity);
}

function fiveDayDisplay(response) {
  console.log(response)
  // convert the record, use moment to read the date, start of hour 0, 

  // temp min/max
  // average wind
  // average humidity
  // icon mode style average (most commun occurance)

}

// Function to empty out the articles
function clear() {
  $("#weather-container").empty();
}

