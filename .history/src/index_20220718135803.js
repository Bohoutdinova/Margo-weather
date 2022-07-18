// current time
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

//search weather by city input

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
  return axios.get(weatherUrl);
}

function submit(event) {
  event.preventDefault();
  let submitCity = document.querySelector("#searchCityForm");
  getWeatherCel(submitCity.value).then(replaceWeather);
}

let submitCity = document.querySelector(".form-inline");
submitCity.addEventListener("submit", submit);

//current weather button

function getForecast(coordinates) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiurl2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}$units=metric`;
  axios.get(apiurl2).then(displayForecast);
}

function replaceCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentButton = document.querySelector("#currenButton");
currentButton.addEventListener(`click`, replaceCurrent);

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(replaceWeather);
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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
  <div class="col-2">
  <div class="weather-forecast-date">${day}</div>
   <img src="https://ssl.gstatic.com/onebox/weather/64/cloudy.png"
                alt=""/>
   <div class="weather-forecast-temp">
   <span class="weather-forecast-max"> max°</span> 
   <span class="weather-forecast-min"> min°</span>
   </div>
</div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
