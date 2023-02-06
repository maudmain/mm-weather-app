# mm-weather-app - Happy Travel Weather Dashboard

## Project description
Build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

## Instructions
- Create a weather dashboard with form inputs.
    - When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history
    - When a user views the current weather conditions for that city they are presented with:
            - The city name
            - The date
            - An icon representation of weather conditions
            - The temperature
            - The humidity
            - The wind speed

- When a user view future weather conditions for that city they are presented with a 5-day forecast that displays:
            - The date
            - An icon representation of weather conditions
            - The temperature
            - The humidity

- When a user click on a city in the search history they are again presented with current and future conditions for that city

## Usage
To view the final results, you will need to open the page in the browser [Deployed Landing Page](https://maudmain.github.io/mm-weather-app/).
The page was built using minimal HTML and CSS and dynamically adding the elements, methods, bootstrap (for style and media query responsiveness)... using Jquery and Open Weather Map server API requests to acces the weather and geolocalisation data.
Please also note the use of local storage to store any persitent data.

![Landing Page Happy Weather Tavel](./assets/img/screenshot%20landing%20page%20-%20Happy%20Travel%20Weather.png)

When loading the page you are presented with a search bar and button, enter a city for which you would liek to check the weather.
It will then display the current weather and 5 day forecast for this city.

![First search results](./assets/img/screenshot%20first%20search%20-%20Happy%20Travel%20Weather.png)

The search is stored locally (max 5 searches stored at one time), when you reopen the page you will be presented with your latest search.
You can search again or click on one of the cities in the history to load teh weather forecasts again.

![City search history](./assets/img/Local%20Storage-%20city%20search%20history%20-%20Happy%20Travel%20Weather.png)

## Credits
- edX Bootcamp: for project brief and criterias, tutorial and ressources about APIs provided during this week's course.
- TLK for his help working through the 5 day forecast concept and teaching me best practices...

What I have learned/ resources:
- [moment.locale()](https://momentjs.com/docs/#/i18n/changing-locale/)
- [Template literal, string interpolation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#syntax)
- [for...in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in)
- [object.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
- [getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get)
- [.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)


- [code for mode- number that occurs most often](https://vhudyma-blog.eu/mean-median-mode-and-range-in-javascript/#Mode)
- [code for gradient custom jumbotron](https://www.jquery-az.com/7-templates-bootstrap-jumbotron-component/)

## License
MIT