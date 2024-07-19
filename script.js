document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '4daf7d62a3003ddb5ea6c57ae1652e9c'; // Replace with your OpenWeatherMap API key

    const getWeatherButton = document.getElementById('getWeatherButton');
    const detectLocationButton = document.getElementById('detectLocationButton');
    const locationInput = document.getElementById('locationInput');
    const locationName = document.getElementById('locationName');
    const temperature = document.getElementById('temperature');
    const weatherDescription = document.getElementById('weatherDescription');

    getWeatherButton.addEventListener('click', () => {
        const location = locationInput.value;
        if (location) {
            getWeatherByLocationName(location, apiKey);
        } else {
            alert('Please enter a location');
        }
    });

    detectLocationButton.addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                getWeatherByCoordinates(lat, lon, apiKey);
            }, () => {
                alert('Unable to retrieve your location');
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    });

    function getWeatherByLocationName(location, apiKey) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                displayWeatherData(data);
            })
            .catch(error => {
                console.error('Error fetching the weather data:', error);
                displayError('Error fetching the weather data');
            });
    }

    function getWeatherByCoordinates(lat, lon, apiKey) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                displayWeatherData(data);
            })
            .catch(error => {
                console.error('Error fetching the weather data:', error);
                displayError('Error fetching the weather data');
            });
    }

    function displayWeatherData(data) {
        if (data.cod === 200) {
            locationName.textContent = data.name;
            temperature.textContent = `Temperature: ${data.main.temp}°C`;
            weatherDescription.textContent = `Weather: ${data.weather[0].description}`;
        } else {
            displayError('Location not found');
        }
    }

    function displayError(message) {
        locationName.textContent = '';
        temperature.textContent = '';
        weatherDescription.textContent = message;
    }
});
