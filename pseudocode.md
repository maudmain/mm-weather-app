## pseudocode weather app   
 Acceptance Criteria
* Create a weather dashboard with form inputs.
  * When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history
  * When a user views the current weather conditions for that city they are presented with:
    * The city name
    * The date
    * An icon representation of weather conditions
    * The temperature
    * The humidity
    * The wind speed
  * When a user view future weather conditions for that city they are presented with a 5-day forecast that displays:
    * The date
    * An icon representation of weather conditions
    * The temperature
    * The humidity
  * When a user click on a city in the search history they are again presented with current and future conditions for that city

on page load
DISPLAY last city searched

- DECLARE global variables
    - check queryables
        city input
        search button
        last 5 locations searched
        clear history button
        display weather dashboard

- CREATE element for form input for the city search
    - POPULATE
    - APPEND

- CREATE element for city stored in local storage
    - POPULATE
    - APPEND

bootstrap card x1- use Jquery
- DISPLAY current weather function
    * The city name
    * The date
    * An icon representation of weather conditions
    * The temperature
    * The humidity
    * The wind speed

boostrap cards x5 - use Jquery
- DISPLAY 5-day forecast function
    * The date
    * An icon representation of weather conditions
    * The temperature
    * The humidity

- EVENT Listener

- STORE to local storage the searched city
    SET

- GET the last searches from locsal storage


