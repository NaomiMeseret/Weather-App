function cityName(event) {
  event.preventDefault();
  let input = document.querySelector("#input");
  let city = document.querySelector("#city-name");
  city.innerHTML = input.value;
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", cityName);
