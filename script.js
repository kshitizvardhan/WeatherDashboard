const cityInput = document.querySelector(".input-city");        //  This selector targets elements with the class name "input-city". This assigns the selected HTML element to the variable 
const searchButton = document.querySelector(".search-btn");
const locationButton = document.querySelector(".location-btn");
const currentWeatherDiv = document.querySelector(".weather-data");
const error404 = document.querySelector(".not-found");
const container = document.querySelector('.container');
const API_KEY = '20eb4e00e1c46e97bcd5009a3fb699fe';


function getWeather(city){
    
    if (city === undefined){
        city = document.querySelector(".input-weather input").value;
    }
    console.log(city)

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
        .then(response => response.json())
        .then(json => {
            console.log(json)
            if(json.cod === "404"){
                currentWeatherDiv.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            currentWeatherDiv.style.display = 'block';

            const image = document.querySelector('.weather-data .current-weather .icon img');
            const cityName = document.querySelector('.weather-data .current-weather .details .name');
            const temperature = document.querySelector('.weather-data .current-weather .details .temperature');
            const description = document.querySelector('.weather-data .current-weather .details .description');
            const humidity = document.querySelector('.weather-data .current-weather .details .humidity');
            const wind = document.querySelector('.weather-data .current-weather .details .wind');
            const bgColor = document.querySelector('.weather-data .current-weather');

            const weather = json.weather[0].main;
            switch (weather) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    bgColor.style.backgroundColor = '#e05b19';
                    bgColor.style.color = '#fff'
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    bgColor.style.backgroundColor = '#005EA6';
                    bgColor.style.color = '#fff'
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    bgColor.style.backgroundColor = '#E6F1F5';
                    bgColor.style.color = 'Black'
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    bgColor.style.backgroundColor = '#b3c7cc';
                    bgColor.style.color = "black"
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    bgColor.style.backgroundColor = '#A6B9C1';
                    bgColor.style.color = "black"
                    break;

                default:
                    image.src = '';
            }

            cityName.innerHTML = `${json.name}`
            temperature.innerHTML = `Feels like ${parseInt(json.main.temp)}°C`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `Humidity: ${json.main.humidity}%`;
            wind.innerHTML = `Wind Blows ${parseInt(json.wind.speed)}Km/h`;
        })

        .catch((err) =>{
            console.log(err);
        })
}

function getUserCoordinates(){
    navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords; // Get coordinates of user location
            // Get city name from coordinates using reverse geocoding API
            const API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
            fetch(API_URL)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    const city = data[0].name;
                    console.log(city);
                    getWeather(city);
                })
            
                .catch(() => {
                    alert("An error occurred while fetching the city name!");
                });
            },
            
            error => { // Shows alert if user denied the location permission
            if (error.code === error.PERMISSION_DENIED) {
                alert("Geolocation request denied. Please reset location permission to grant access again.");
            } else {
                alert("Geolocation request error. Please reset location permission.");
            }
        });
}

locationButton.addEventListener('click', () => {
    getUserCoordinates();
})

searchButton.addEventListener('click', () => {
    getWeather();
})

document.addEventListener('keydown',(check) =>{
    if(check.key === "Enter"){
        getWeather();
    }
})