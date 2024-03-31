// Function to fetch weather data for 10 countries
function fetchWeatherForCountries() {
    const apiKey = '85ac200afa373d0b3936d074deb71f01';
    const countries = ['United States', 'United Kingdom', 'France', 'Germany', 'Canada', 'Australia', 'Japan', 'China', 'India', 'Brazil'];
    const apiUrlBase = 'https://api.openweathermap.org/data/2.5/weather';
    const weatherInfoContainer = document.getElementById('countriesWeather');

    countries.forEach(country => {
        const apiUrl = `${apiUrlBase}?q=${country}&appid=${apiKey}&units=metric`;
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Check if data contains necessary properties
                if (data.main && data.main.temp && data.weather && data.weather[0] && data.weather[0].main && data.weather[0].description) {
                    const weatherInfo = `
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${country}</h5>
                                <p class="card-text">Temperature: ${data.main.temp} °C</p>
                                <p class="card-text">Weather: ${data.weather[0].main}</p>
                                <p class="card-text">Description: ${data.weather[0].description}</p>
                            </div>
                        </div>
                    `;
                    weatherInfoContainer.innerHTML += weatherInfo;
                } else {
                    console.error(`Incomplete data received for ${country}:`, data);
                }
            })
            .catch(error => {
                console.error(`Error fetching weather for ${country}:`, error);
            });
    });
}

// Function to fetch weather data for the input location
function fetchWeather() {
    const location = document.getElementById('locationInput').value;
    const apiKey = '85ac200afa373d0b3936d074deb71f01'; // Replace 'YOUR_API_KEY' with your actual API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
            setBackground(data.weather[0].main);
            // Clear error message if previous request succeeded
            document.getElementById('errorMessage').textContent = '';
        })
        .catch(error => {
            // Display error message
            document.getElementById('errorMessage').textContent = 'Error fetching weather. Please try again.';
            console.error('Error fetching weather:', error);
        });
}

// Function to display weather information for the input location
function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `
        <h2 class="mb-4">Current Weather</h2>
        <p><strong>Location:</strong> ${data.name}, ${data.sys.country}</p>
        <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>Weather:</strong> ${data.weather[0].main}</p>
        <p><strong>Description:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;
}

// Function to set background based on weather condition
function setBackground(weatherCondition) {
    const backgroundElement = document.getElementById('background');
    switch (weatherCondition.toLowerCase()) {
        case 'clear':
            backgroundElement.style.backgroundImage = 'url("images/sunny.jpg")';
            break;
        case 'clouds':
            backgroundElement.style.backgroundImage = 'url("images/cloudy.png")';
            break;
        case 'rain':
            backgroundElement.style.backgroundImage = 'url("images/rainy.jpg")';
            break;
        case 'thunderstorm':
            backgroundElement.style.backgroundImage = 'url("images/thunderstorm.jpg")';
            break;
        case 'snow':
            backgroundElement.style.backgroundImage = 'url("images/snowy.jpg")';
            break;
        default:
            backgroundElement.style.backgroundImage = 'url("images/default.jpg")';
    }
}

// Add event listener for Enter key press
document.getElementById('locationInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        fetchWeather();
    }
});

// Fetch weather for the initial location
fetchWeather();

// Fetch weather for 10 countries
fetchWeatherForCountries();
