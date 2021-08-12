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

//function showCity(event) {
//  event.preventDefault();
//  let currentCity = document.querySelector("#search-city");
//  let SignCity = document.querySelector(".circle-txt-city");
//  SignCity.innerHTML = currentCity.value;
//}

//let searchForm = document.querySelector(".search-bar");
//searchForm.addEventListener("submit", showCity);

//function showCelsius(event) {
//event.preventDefault();
//let celsiusValue = document.querySelector(".temp");
//}

//let celsiusLink = document.querySelector(".celsius-link");
//celsiusLink.addEventListener("click", showCelsius);

//function showFahrenheit(event) {
//event.preventDefault();
//let fahrenheitValue = document.querySelector(".temp");
//fahrenheitValue.innerHTML = 66;
//}

//let fahrenheitLink = document.querySelector(".fahrenheit-link");
//fahrenheitLink.addEventListener("click", showFahrenheit);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temp-element");
  temperatureElement.innerHTML = temperature;
  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#hum");
  humidityElement.innerHTML = `${humidity}%`;
  let windSpeed = Math.round(response.data.wind.speed);
  let windSpeedElement = document.querySelector("#wind");
  windSpeedElement.innerHTML = `${windSpeed} kmph`;
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
  currentTemperatureElement.innerHTML = currentTemperature;
  let cityName = response.data.name;
  let cityNameElement = document.querySelector("#city");
  cityNameElement.innerHTML = cityName;
  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#hum");
  humidityElement.innerHTML = `${humidity}%`;
  let windSpeed = Math.round(response.data.wind.speed);
  let windSpeedElement = document.querySelector("#wind");
  windSpeedElement.innerHTML = `${windSpeed} kmph`;
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

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentData);
