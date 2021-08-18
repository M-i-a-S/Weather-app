let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = days[now.getDay()];
let currentHour = now.getHours();
let currentMinutes = now.getMinutes();

if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}

if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

let textTime = document.querySelector(".circle-txt-day");
textTime.innerHTML = `${currentDay} ${currentHour}:${currentMinutes}`;

function showTemperature(response) {
  let temperatureElement = document.querySelector("#temp-element");
  let cityElement = document.querySelector("#city");
  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#hum");
  let windSpeed = Math.round(response.data.wind.speed);
  let windSpeedElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemp);
  cityElement.innerHTML = response.data.name;
  humidityElement.innerHTML = `${humidity}%`;
  windSpeedElement.innerHTML = `${windSpeed} kmph`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].main);
}

function getCurrentCity(event) {
  event.preventDefault();
  let apiKey = "dabe2819a5207f64cd7ba85175ca0828";
  let currentCity = document.querySelector("#search-city");
  let signCity = document.querySelector(".circle-txt-city");
  signCity.innerHTML = currentCity.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

let searchBar = document.querySelector(".search-bar");
searchBar.addEventListener("submit", getCurrentCity);

function showGeoTemperature(response) {
  console.log(response);
  let currentTemperature = Math.round(response.data.main.temp);
  let currentTemperatureElement = document.querySelector("#temp-element");
  let cityName = response.data.name;
  let cityNameElement = document.querySelector("#city");
  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#hum");
  let windSpeed = Math.round(response.data.wind.speed);
  let windSpeedElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;

  currentTemperatureElement.innerHTML = Math.round(celsiusTemp);
  cityNameElement.innerHTML = cityName;
  humidityElement.innerHTML = `${humidity}%`;
  windSpeedElement.innerHTML = `${windSpeed} kmph`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].main);
}

function showPosition(position) {
  let apiKey = "6c19daaca2f5b29c42112f1a349df87f";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showGeoTemperature);
}

function getCurrentData() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitValue = document.querySelector(".temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  fahrenheitValue.innerHTML = Math.round(celsiusTemp * 1.8 + 32);
}

function showCelsius(event) {
  event.preventDefault();
  let celsiusValue = document.querySelector(".temp");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  celsiusValue.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentData);

let fahrenheitLink = document.querySelector(".fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector(".celsius-link");
celsiusLink.addEventListener("click", showCelsius);

search("Slavonski Brod");
