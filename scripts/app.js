var btn = document.querySelector(".submit");
var input = document.querySelector("#input");
var display = document.querySelector(".display");
var cityname = document.querySelector("#city-name");
var wind = document.querySelector(".wind");
var clouds = document.querySelector(".clouds");
var temp = document.querySelector(".temp");
var weatherIcon = document.querySelector(".logo");
var lat;
var long;
let message;
const uri = "https://api.openweathermap.org/data/2.5/weather?q=";
const appid = "d051b119410eccb47463b12e9f73cf47";
// let frame = document.getElementsByTagName("iframe")[0];

function getData() {
  fetch(`${uri}${input.value}&appid=${appid}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      var temperatue = data.main.temp;
      var windSpeed = data.wind;
      var { icon, description } = data.weather[0];
      var cloudCover = data.clouds;
      var name = data.name;

      lat = data.coord.lat;
      long = data.coord.lon;
      message = data.message;

      cityname.innerText = name;
      temp.innerText = Math.round(temperatue - 273.15) + " °C";
      clouds.innerText = cloudCover.all.toString() + "%";
      wind.innerText = Math.round(windSpeed.speed) + "Km/h";
      display.style.display = "flex";
      weatherIcon.style.display = "block";
      weatherIcon.src = "https://openweathermap.org/img/wn/" + icon + ".png";

      const weatherData = {
        temperature: temp.innerText,
        clouds: clouds.innerText,
        wind: wind.innerText,
        cityName: name,
        weatherIcon: weatherIcon.src,
        expiry: 1800000 + new Date().getTime(),
      };

      localStorage.removeItem(name);
      localStorage.removeItem(input.value);

      localStorage.setItem(input.value, JSON.stringify(weatherData));
      localStorage.setItem(name, JSON.stringify(weatherData));

      console.log("latitude : ", lat);
      console.log("longitude : ", long);

      //   let url =
      //     "https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d224134.42862338305!2d" +
      //     long +
      //     "!3d" +
      //     lat +
      //     "!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1658848877412!5m2!1sen!2sin";
      //   frame.src = url;
    })

    .catch((err) => {
      console.log("Error Part::");
      console.log(err);
      console.log("Trying to get stale data:");
      const staleData = localStorage.getItem(input.value);
      console.log("stale data", staleData);
      const weatherData = JSON.parse(staleData);

      if (weatherData) {
        display.style.display = "flex";
        weatherIcon.style.display = "block";
        temp.innerText = weatherData.temperature;
        clouds.innerText = weatherData.clouds;
        wind.innerText = weatherData.wind;
        cityname.innerText = weatherData.cityName;
        weatherIcon.src = weatherData.weatherIcon;
      }
    });
}

input.addEventListener("keydown", (event) => {
  if (event.which == 13) {
    try {
      const staleData = localStorage.getItem(input.value);
      if (staleData) {
        const weatherData = JSON.parse(staleData);
        let diff = weatherData.expiry > new Date().getTime();
        if (weatherData.expiry > new Date().getTime()) {
          display.style.display = "flex";
          weatherIcon.style.display = "block";
          temp.innerText = weatherData.temperature;
          clouds.innerText = weatherData.clouds;
          wind.innerText = weatherData.wind;
          cityname.innerText = weatherData.cityName;
          weatherIcon.src = weatherData.weatherIcon;
        } else {
          getData();
        }
      } else {
        getData();
      }
    } catch (err) {
      console.log(err);
    }
  }
});

btn.addEventListener("click", getData);
