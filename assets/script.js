// declare queryables

// API key
const API = "5e1d2997c137aaf57841dd7d335e490e";

// global variables

// page load function- show search history

// event listener
$("#search-button").on("click", function(event){
    event.preventDefault();
    
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
    const weatherQueryURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}`
   

    $.ajax({
        url: weatherQueryURL,
        method: "GET"
      }).then(weatherDisplay);   


}

function weatherDisplay(response){
    console.log(response)

    let currentWeather = $("<div>")

    let currentdate = moment().format("L");

    let cityName = $("<h2>").text(response.name)
    $("#weather-container").append(cityName  )
}