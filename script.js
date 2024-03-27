const API_KEY = '20eb4e00e1c46e97bcd5009a3fb699fe';

const GET_COORDINATES_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`

const INPUT_API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`;