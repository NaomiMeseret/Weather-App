function updateWeather(response) {
  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = response.data.city;
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(response.data.temperature.current);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${response.data.wind.speed}km/hr`;
  let now = new Date(response.data.time * 1000);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(now);
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon" />`;
  getForecast(response.data.city);
}
function formatDate(now) {
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

  return `${day} ${hours}:${minutes}`;
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
function getForecast(city) {
  let apiKey = "a8fbc2t48340bb8e410f0a367bo411a6";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}& units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function formatDay(timeStamp){
  let date=new Date(timeStamp * 1000)
  let days=["Sun","Mon","Tue","Wen","Thu","Fri","Sat"]
  return days[date.getDay()]; 
}
function displayForecast(response) {
  let days = ["Tue", "Wen", "Thu", "Fri", "Sat"];
  let forecastHtml = "";
  response.data.daily.forEach(function (day,index) {
    if(index < 5){
      forecastHtml =
      forecastHtml +
      `
    <div class="forecast-day">
      <div class="forecast-date">${formatDay(day.time)}</div>
     <img src="${day.condition.icon_url}"  class="forecast-icon"/>
    <div class="forecast-temperatures">
        <div class="forecast-temperature">
          <strong>${Math.round(day.temperature.maximum)}°</strong>
        </div>
        <div class="forecast-temperature">${Math.round(
          day.temperature.minimum)}°</div>
      </div>
    </div>`;}
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", cityName);
searchCity("Paris");
