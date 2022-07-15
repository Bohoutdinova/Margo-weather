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

let Celsius = document.querySelector("#CelsiusD");
Celsius.addEventListener("click", replaceCelsius);

let Fahrenheit = document.querySelector("#FahrenheitD");
Fahrenheit.addEventListener("click", replaceFahrenheit);

//Вот этот кусок кода надо передалть передав в него реальные данные

//надо будет добавить кусок кода по нажатию на линки Цельсия и Фаренгейта

// function replaceFahrenheit(event) {
//   event.preventDefault();
//   let degrees = document.querySelector("#Degrees");
//   degrees.innerHTML = 50; // сюда вставить результат со второй ссылки по фарингейту
// }
