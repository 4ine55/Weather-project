// Date and Time
function formatDate(now) {
  let days = [
    "dimanche",
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
  ];
  let day = days[now.getDay()];

  let months = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let year = now.getFullYear();
  let hour = now.getHours();
  let minute = String(now.getMinutes()).padStart(2, "0");

  let dateAndTime = {
    date: date,
    month: month,
    year: year,
    hour: hour,
    minute: minute,
    day: day,
  };
  return dateAndTime;
}
function updateDate() {
  let dateAndTime = formatDate(new Date());
  let emissionDate = document.querySelector("#date");
  emissionDate.innerHTML = `Émis le ${dateAndTime.day} ${dateAndTime.date} ${dateAndTime.month} ${dateAndTime.year}, à ${dateAndTime.hour}:${dateAndTime.minute}`;
}

function showTemperature(response) {
  let tempArrondi = Math.round(response.data.main.temp);
  console.log(tempArrondi);
  let tempValue = document.querySelector("#temp-today");
  tempValue.innerHTML = tempArrondi;
}
function updateTemp(city) {
  let apiKey = "8ade99d032cd211ae889750690106e26";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let cityName = city;

  axios
    .get(`${apiUrl}q=${cityName}&units=metric&appid=${apiKey}`)
    .then(showTemperature);
}
function updateCity(newCity) {
  let visibleCity = document.querySelector("#city");
  visibleCity.innerHTML = newCity;
}
function searchCity(event) {
  event.preventDefault();
  let userCity = document.querySelector("#search-bar");
  userCity = userCity.value;
  userCity = userCity.trim();
  userCity = userCity.toLowerCase();
  userCity = userCity.charAt(0).toUpperCase() + userCity.slice(1);
  updateCity(userCity);
  updateDate();
  updateTemp(userCity);
}
function findCity(response) {
  let localisedCity = response.data.name;
  updateCity(localisedCity);
}
function searchLocation() {
  function retrievePosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let unit = "metric";
    let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
    let apiKey = "8ade99d032cd211ae889750690106e26";
    let apiUrl = `${apiEndPoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;

    axios.get(apiUrl).then(showTemperature);
    axios.get(apiUrl).then(findCity);
    console.log(position);

    updateDate();
  }

  navigator.geolocation.getCurrentPosition(retrievePosition);
}
function convertToCelcius() {
  let celsiusValue = document.querySelector("#temp-today");
  celsiusValue.innerHTML = "19";
}
function convertToFahrenheit() {
  let fahrenheitValue = document.querySelector("#temp-today");
  fahrenheitValue.innerHTML = "66";
}
updateDate();
let loupe = document.querySelector("#bouton-loupe");
loupe.addEventListener("click", searchCity);

let locationPin = document.querySelector("#bouton-pin");
locationPin.addEventListener("click", searchLocation);

let celciusIcon = document.querySelector("#active-unit");
let fahrenheitIcon = document.querySelector("#passive-unit");
celciusIcon.addEventListener("click", convertToCelcius);
fahrenheitIcon.addEventListener("click", convertToFahrenheit);
