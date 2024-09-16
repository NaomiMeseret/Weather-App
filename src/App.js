let now = new Date();
let date = document.querySelector(".date");
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
let minutes = now.getMinutes();
minutes = minutes < 10 ? "0" + minutes : minutes;

date.innerHTML = `${day} ${hours}:${minutes},`;

function updateWeather(response) {
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(response.data.temperature.current);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${response.data.wind.speed}km/hr`;
}
function searchCity(city) {
  let apiKey = "a8fbc2t48340bb8e410f0a367bo411a6";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(updateWeather);
}
function cityName(event) {
  event.preventDefault();
  let input = document.querySelector("#input");
  let city = document.querySelector("#city-name");
  city.innerHTML = input.value;
  searchCity(input.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", cityName);
