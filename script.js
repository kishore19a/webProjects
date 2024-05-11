const googleMapsApi = getGoogleMapsApiKey();
const openWeatherApi = getOpenWeatherApiKey();

// get input element data on button click
const inputData = document.querySelector('.search').children[0];
const button = document.querySelector('.search').children[1];
let currentCity = '';

// Get the user's location and display the weather data for that city
function getWeatherDataForCurrentCity() {
  // First, get the user's location coordinates using the Geolocation API
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showCity);
  } else {
    console.log('Geolocation is not supported by this browser.');
  }

  // Then, pass the location coordinates to a Geocoding API to get the city name
  function showCity(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Make a request to a Geocoding API (e.g. Google Maps Geocoding API)
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleMapsApi}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Parse the city name from the API response
        console.log(data);
        currentCity = data.results[0].address_components.find((component) => component.types.includes('locality')).long_name;

        // Display the weather data for the city
        getWeatherData(currentCity);
      })
      .catch((error) => {
        console.log(error);
        // If the Geocoding API request fails, hide the weather data area
        const weatherData = document.querySelector('.weatherData');
        weatherData.style.display = 'none';
      });
  }
}

// Get the user's location and display the weather data for that city
getWeatherDataForCurrentCity();

// Add an event listener to the button to get the weather data for the city entered by the user
button.addEventListener('click', async () => {
  getWeatherData(inputData.value);
});

// An async function to fetch weather data from the OpenWeatherMap API
async function getWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherApi}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();

  if (response.status == 404) {
    alert('Place not found');
    // Reset the input field placeholder
    inputData.value = '';
    inputData.placeholder = 'Enter Place Name';
  } else {
    const temp = data.main.temp;
    const tempParagraph = document.querySelector('.temperature');
    tempParagraph.innerHTML = Math.round(temp) + '°C';

    const humidity = data.main.humidity;
    const humidityParagraph = document.querySelector('.humidity .otherWeatherValue');
    humidityParagraph.innerHTML = humidity + '%';

    const windspeed = data.wind.speed;
    const windspeedParagraph = document.querySelector('.windspeed .otherWeatherValue');
    windspeedParagraph.innerHTML = Math.round(windspeed * 3.6 * 100) / 100 + ' km/h';

    const cityName = document.querySelector('.city');
    cityName.innerHTML = data.name;

    const weatherImage = document.querySelector('.weatherData > img');
    console.log(data.weather[0].main);

    // Change weather image based on weather
    switch (data.weather[0].main.toLowerCase()) {
      case 'clear':
        weatherImage.src = 'images/clear.png';
        break;

      case 'clouds':
        weatherImage.src = 'images/clouds.png';
        break;

      case 'rain':
        weatherImage.src = 'images/rain.png';
        break;

      case 'snow':
        weatherImage.src = 'images/snow.png';
        break;

      case 'thunderstorm':
        weatherImage.src = 'images/thunderstorm.png';
        break;

      case 'drizzle':
        weatherImage.src = 'images/drizzle.png';
        break;

      case 'mist':
        weatherImage.src = 'images/mist.png';
        break;

      default:
        break;
    }

    // Display the weather data area
    const weatherData = document.querySelector('.weatherData');
    weatherData.style.display = 'block';
  }
}
