let now = new Date();
let day = now.getDay();
let days = [
  "Sunday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let dayWeek = days[day];

function formatDate(date) {
  if (date < 10) {
    return `0${date}`;
  } else {
    return date;
  }
}
function getHours() {
  let hour = now.getHours();
  return formatDate(hour);
}
function getMinutes() {
  let minutes = now.getMinutes();
  return formatDate(minutes);
}

let replaceDate = document.querySelector(".date-time-inner");
replaceDate.innerHTML = `${dayWeek} ${getHours()}:${getMinutes()}`;

let submitCity = document.querySelector(".form-inline");
submitCity.addEventListener("submit", submit);

function retrievePosition(position) {
  let apiKey = "d4cc0973eca06a6e519ffd554008de09";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(replaceWeather);
}

function replaceCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentButton = document.querySelector("#currenButton");
currentButton.addEventListener(`click`, replaceCurrent);

function formatDateForecast(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `
  <div class="col-2">
  <div class="weather-forecast-date">${formatDateForecast(forecastDay.dt)}</div>
   <img src="http://openweathermap.org/img/wn/${
     forecastDay.weather[0].icon
   }@2x.png"
                alt="" width="50"/>
   <div class="weather-forecast-temp">
   <span class="weather-forecast-max">${Math.round(
     forecastDay.temp.max
   )}°</span> 
   <span class="weather-forecast-min">${Math.round(
     forecastDay.temp.min
   )}°</span>
    </div>
</div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "d4cc0973eca06a6e519ffd554008de09";
  let apiurl2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiurl2).then(displayForecast);
}

function replaceWeather(response) {
  document.querySelector("#Degrees").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#currentCity").innerHTML = response.data.name;
  document.querySelector("#condition").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function getWeatherCel(city) {
  let apiKey = "d4cc0973eca06a6e519ffd554008de09";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(weatherUrl).then(replaceWeather);
}

function submit(event) {
  event.preventDefault();
  let submitCity = document.querySelector("#searchCityForm");
  getWeatherCel(submitCity.value).then(replaceWeather);
}

let celsiusTemperature = null;

function replaceCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#Degrees");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function replaceFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#Degrees");
  temperatureElement.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}

let Celsius = document.querySelector("#CelsiusD");
Celsius.addEventListener("click", replaceCelsius);

let Fahrenheit = document.querySelector("#FahrenheitD");
Fahrenheit.addEventListener("click", replaceFahrenheit);

replaceWeather("Poltava");
