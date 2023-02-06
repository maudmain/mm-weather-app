// set the location to have date display in en-gb format
moment.locale('en-gb');

// API key, parameter for the query URL
const API = "5e1d2997c137aaf57841dd7d335e490e";

// global variables
let currentDate = moment().format('L');
let searchArray = JSON.parse(window.localStorage.getItem("storedSearches")) ?? [];

// page load function- show search history
$(document).ready(function () {
  if (searchArray.length > 0) { 
    $("#search-city").val(searchArray[0]); 
    cityInput();
  }
});

// event listener for the city search click
$("#search-button").on("click", function (event) {
  event.preventDefault();
  cityInput();
});

// function for the city input
function cityInput() {
  const citySearchInput = $("#search-city").val().trim();
  // if the search is null or empty return 
  if (citySearchInput === null || citySearchInput ===""){
    return
  }
  // adds the last input at beginning of the array and returns the new length of the array
  // if it's not already at the top of the list
  if (searchArray.indexOf(citySearchInput) !== 0) {
    searchArray.unshift(citySearchInput);
    localStorage.setItem("storedSearches", JSON.stringify(searchArray));
  };

  // empties the container
  $("#search-history").empty();

  // for loop to create a new search history button elements (max 5)
  for (i = 0; i < 5; i++) {
    if (i >= searchArray.length) { break; }
    let cityEl = $("<button id='searched-city'>").addClass('bg-secondary btn my-1 text-white');
    cityEl.text(searchArray[i]);
    $("#search-history").append(cityEl);
    //event listener for the history button
    //When a user click on a city in the search history they are again presented with current and future conditions for that city
    cityEl.on('click', function (event) {
      event.preventDefault();
      $("#search-city").val(event.target.innerText);
      cityInput();
    });
  
  };

  const cityQueryURL = `http://api.openweathermap.org/geo/1.0/direct?q=${citySearchInput}&limit=1&appid=${API}`;

  clear();

  $.ajax({
    url: cityQueryURL,
    method: "GET"
  }).then(weatherQuery);

};

function weatherQuery(response) {
  console.log(response)

  // variables for the lat and lon keys in the response object to add as parameters in the query
  let lat = response[0].lat;  
  let lon = response[0].lon;
  const weatherQueryURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API}`;

  const fiveDayQueryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API}`;

  // ajax query for the current weather
  $.ajax({
    url: weatherQueryURL,
    method: "GET"
  }).then(weatherDisplay);

  //ajax query for the 5 day forecast
  $.ajax({
    url: fiveDayQueryURL,
    method: "GET"
  }).then(fiveDayDisplay);
};

// function for the current weather
function weatherDisplay(response) {
  console.log(response);

  let currentWeather = $("<div class='current-weather,card-body>");
  $("#weather-container").append(currentWeather).removeClass("d-none");

  let cityName = $("<h2>").text(response.name + ' (' + currentDate + ')');
  let iconCurrent = response.weather[0].icon;
  let currentWeatherIcon = $("<img>").attr('src', `https://openweathermap.org/img/w/${iconCurrent}.png`);

  let currentTemp = $("<p>").text(`Temp: ${response.main.temp} °C`);
  let currentWind = $("<p>").text(`Wind: ${response.wind.speed} meter/sec`);
  let currentHumidity = $("<p>").text(`Humidity: ${response.main.humidity} %`);

  $("#weather-container").append(cityName, currentWeatherIcon, currentTemp, currentWind, currentHumidity);
}

// function for the 5 day forecast
function fiveDayDisplay(response) {

  // create an empty object to hold the daily data from the query response
  let forecastDays = {};
  console.log(forecastDays)

  // for each loop to declare the timestamp moments
  // create an empty array
  // push the data to the array
  response.list.forEach(f => {
    // day is the moment unix format, used for easier sorting
    const day = moment.unix(f.dt).startOf("day").format("X");
    // gets the array at the object key of the day or assigns a new empty array if it doesn't alreday exists
    const hourlyForecasts = forecastDays[day] ??= [];
    hourlyForecasts.push(f);
  })

  // takes the crude 3 hourly forecast arrays grouped by day and passes them to the ForecastDay constructor and ...
  // creates an object "blending behaviour and state" which replaces the original crude array
  for (day in forecastDays) {
    forecastDays[day] = new ForecastDay(forecastDays[day], moment.unix(day));
  }
  console.log(forecastDays);

  // for...each loop to sort and create DOM elements representing the ForecastDay objects
  Object.keys(forecastDays).sort().forEach(day => {
    const forecastDay = forecastDays[day];

    // if statement to compare date and not show the current day in this container
    if (forecastDay.isToday){
      return;
    }

    // create, append card elements
    let forecastCard = $("<div>").addClass("forecast-cards d-flex justify-content-center  ")
    forecastCard.addClass("card col-xl-2 col-md-5 col-sm-10 mt-2 text-center bg-secondary text-white");
    $("#five-day-container").append(forecastCard);

    //  Populate the card element with a div element containing the information
    let cardBody = $("<div class='card-body'>");
    forecastCard.append(cardBody)

    let cardTitle = $("<h4>").text(`${forecastDay.day.format('L')}`);
    let cardIcon = $("<img>").attr('src', `https://openweathermap.org/img/w/${forecastDay.icon}.png`);
    let cardTemp = $("<p>").text(`Temp: ${forecastDay.temp} °C`);
    let cardWind = $("<p>").text(`Wind: ${forecastDay.wind} meter/sec`);
    let cardHumidity = $("<p>").text(`Humidity: ${forecastDay.humidity} %`);
    cardBody.append(cardTitle, cardIcon, cardTemp, cardWind, cardHumidity)
  })
}

// function to return the day and the average temp/wind/humidity for each day 
// using an object constructor function to create an object type 
function ForecastDay(hourlyForecasts, day) {
  return {
    forecasts: hourlyForecasts,
    day,
    // getter method 
    get temp() {
      // this refers to the object
      // using the .map() we create a new array to hold temp from the daily timestamps
      // using the .reduce() we add all the temp values to return a single value
      // we divide the sum by the length of the object to get the mean average
      return (this.forecasts.map(f => f.main.temp).reduce(
        (sum, temp) => sum + temp
      ) / this.forecasts.length).toFixed(1)
    },
    get wind() {
      return (this.forecasts.map(f => f.wind.speed).reduce(
        (sum, speed) => sum + speed
      ) / this.forecasts.length).toFixed(1)
    },
    get humidity() {
      return (this.forecasts.map(f => f.main.humidity).reduce(
        (sum, humidity) => sum + humidity
      ) / this.forecasts.length).toFixed(1)
    },
    get icon() {
      // as icon is not a number we can check what icon happens the most during the day, using mode()
      return mode(this.forecasts.map(f => f.weather[0].icon))
    },
    // returns if the day of the forecast is the same as the current day (boolean) so it can be skipped in the forecast
    get isToday() {
      return this.day.isSame(moment().startOf('day'))
    }
  }
}

// Function to empty out the articles
function clear() {
  $("#weather-container").empty();
  $("#five-day-container").empty();
}

// mode assigment to calculate the number that occurs the most often for the get icon()
const mode = arr => {
  const mode = {};
  let max = 0, count = 0;

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];

    if (mode[item]) {
      mode[item]++;
    } else {
      mode[item] = 1;
    }

    if (count < mode[item]) {
      max = item;
      count = mode[item];
    }
  }
  return max;
};