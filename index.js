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
let day = days[now.getDay()];

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

function celciusDisplay(event) {
  event.preventDefault();
  let celciusValue = document.querySelector("#celFahTemp");
  celciusValue.innerHTML = "19°C";
}

let celciusButton = document.querySelector("#celcius");
celciusButton.addEventListener("click", celciusDisplay);

function fahrDisplay(event) {
  event.preventDefault();
  let fahrValue = document.querySelector("#celFahTemp");
  fahrValue.innerHTML = "66°F";
}

let fahrButton = document.querySelector("#fahrenheit");
fahrButton.addEventListener("click", fahrDisplay);

function showWeather(response) {
  document.querySelector("#celFahTemp").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#city-name").innerHTML = `${response.data.name}`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#date").innerHTML = `${day} ${hours}:${minutes}`;
}

function retrievePosition(position) {
  let apiKey = "95fd2bb0e975bc28910a455e37356508";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currLocButt = document.querySelector("#currLocButt");
currLocButt.addEventListener("click", getPosition);

function cityValue(event) {
  event.preventDefault();
  let apiKey = "95fd2bb0e975bc28910a455e37356508";
  let cityVal = document.querySelector("#city-input").value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

let submitButton = document.querySelector("#search-form");
submitButton.addEventListener("submit", cityValue);
