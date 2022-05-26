function formatDate(timestamp) {
  let now = new Date(timestamp);
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
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col">
            <div class="weather-forecast-date">${formatDay(
              forecastDay.dt
            )}</div>
        
      <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
                <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="30"
        />
      </div>


  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "95fd2bb0e975bc28910a455e37356508";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

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
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document
    .querySelector("#main-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#main-icon")
    .setAttribute("alt", response.data.weather[0].description);

  celsiusTemp = response.data.main.temp;

  getForecast(response.data.coord);
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

function search(city) {
  let apiKey = "95fd2bb0e975bc28910a455e37356508";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function retrieveSubmit(event) {
  event.preventDefault();
  let cityVal = document.querySelector("#city-input");
  search(cityVal.value);
}

let submitButton = document.querySelector("#search-form");
submitButton.addEventListener("submit", retrieveSubmit);

function celsiusDisplay(event) {
  event.preventDefault();
  celsiusButton.classList.add("active");
  fahrButton.classList.remove("active");
  let temp = document.querySelector("#celFahTemp");
  temp.innerHTML = Math.round(celsiusTemp);
}

function fahrDisplay(event) {
  event.preventDefault();
  let temp = document.querySelector("#celFahTemp");
  celsiusButton.classList.remove("active");
  fahrButton.classList.add("active");
  let fahrTemp = (celsiusTemp * 9) / 5 + 32;
  temp.innerHTML = Math.round(fahrTemp);
}

let celsiusTemp = null;

let celsiusButton = document.querySelector("#celsius");
celsiusButton.addEventListener("click", celsiusDisplay);

let fahrButton = document.querySelector("#fahrenheit");
fahrButton.addEventListener("click", fahrDisplay);

search("York, UK");
