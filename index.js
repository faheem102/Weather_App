// I have used openweather api and used it. it is a very cool api to fetch data about weather to use in own apps.
// This api is has different endpoints. If someone is looking for current weather data then the following api endpoint
//should be used api.openweathermap.org/data/2.5/weather
// Along with above URL one need to use parameters like cityname, zip code, geolocation and api key as well
// one example of using this api with different parameters is following
//'https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=2e67673623b242fce63358a81c88036e'

// !--Weather app--!

const cityName = document.querySelector(".heading");
const temperature = document.querySelector(".temp-para");
const feeltemp = document.querySelector(".feels-like");
const wind = document.querySelector(".wind-col");
const description = document.querySelector(".weather-col");
const riseTime = document.querySelector(".sunrise-col");
const sunTime = document.querySelector(".sunset-col");

const myButton = document.querySelector(".location");
function getWeather(myData) {
  const city = myData.name;
  const mytemp = myData.main.temp;
  const feeling = myData.main.feels_like;
  const windSpeed = myData.wind.speed;
  const weatherDes = myData.weather[0].description;
  const sunRise = myData.sys.sunrise;
  const sunSet = myData.sys.sunset;
  const date1 = new Date(sunRise * 1000);
  const hours1 = date1.getHours();
  const minutes1 = date1.getMinutes();
  const date2 = new Date(sunSet * 1000);
  const hours2 = date2.getHours();
  const minutes2 = date2.getMinutes();

  cityName.innerHTML = city;
  temperature.innerHTML = mytemp + " °C ";
  feeltemp.innerHTML = `feels like ${feeling}°C`;
  const icon = myData.weather[0].icon;
  const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
  const myImage = document.querySelector(".image");
  myImage.src = imageUrl;
  wind.innerHTML = windSpeed;
  description.innerHTML = weatherDes;
  riseTime.innerHTML = `0${hours1} : ${minutes1}`;
  sunTime.innerHTML = `${hours2} : ${minutes2}`;
}

fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=Copenhagen&units=metric&appid=2e67673623b242fce63358a81c88036e"
)
  .then((response) => response.json())
  .then((myData) => getWeather(myData));

//!--Weather app with geoLocation--!

myButton.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lati = position.coords.latitude;
      const long = position.coords.longitude;
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&units=metric&appid=2e67673623b242fce63358a81c88036e`;
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((myData) => getWeather(myData));
    });
  }
});
