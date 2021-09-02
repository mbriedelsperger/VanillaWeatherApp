let apiKey = "2e53852c75255f55216c821fb2c12211";
let units="metric";
let city="chicago";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
let celsiusTemperature = null;
let fahrenheitTemperature = null;

axios.get(apiUrl).then(displayTemperature);

function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
  }

  function displayForecast() {
    let forecastElement = document.querySelector("#forecast");
  
    let days = ["Thu", "Fri", "Sat", "Sun","Mon", "Tues"];
  
    let forecastHTML = `<div class="row">`;
    days.forEach(function (day) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
          <div class="weather-forecast-date">${day}</div>
          <img
            src="http://openweathermap.org/img/wn/50d@2x.png"
            alt=""
            width="42"
          />
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max"> 18° </span>
            <span class="weather-forecast-temperature-min"> 12° </span>
          </div>
        </div>
    `;
    });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
    console.log(forecastHTML);
  }

function displayTemperature(response) {
    let temperature = document.querySelector("#temperature");
    let city = document.querySelector("#city");
    let description= document.querySelector("#description");
    let humidity = document.querySelector("#humidity");
    let wind = document.querySelector("#wind");
    let date = document.querySelector("#date");
    let icon = document.querySelector("#icon");
  
    celsiusTemperature = response.data.main.temp;
  
    temperature.innerHTML = Math.round(celsiusTemperature);
    city.innerHTML = response.data.name;
    description.innerHTML = response.data.weather[0].description;
    humidity.innerHTML = response.data.main.humidity;
    wind.innerHTML = Math.round(response.data.wind.speed);
    date.innerHTML = formatDate(response.data.dt * 1000);
    icon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    icon.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
  }

  let form = document.querySelector("#search-form");
  form.addEventListener("submit", handleSubmit);

  function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let fahrenheitTemperature = (celsiusTemperature * 9 / 5) + 32;
    let temperature = document.querySelector("#temperature");
    temperature.innerHTML = Math.round(fahrenheitTemperature);
  }
  
    let fahrenheitLink = document.querySelector("#fahrenheit-link");
    fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

    function displayCelsiusTemperature(event) {
      event.preventDefault();
      let temperature = document.querySelector("#temperature");
      temperature.innerHTML = Math.round(celsiusTemperature);
      
    }
    
      let celsiusLink = document.querySelector("#celsius-link");
      celsiusLink.addEventListener("click", displayCelsiusTemperature);

  displayForecast();
