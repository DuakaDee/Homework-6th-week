const apiKey = "42t6213cf48c3o5336a35503b83be79d"; // Your SheCodes Weather API key

document
  .getElementById("search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const city = document.getElementById("search-input").value;

    if (city) {
      getWeatherData(city);
    }
  });

function getWeatherData(city) {
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios
    .get(apiUrl)
    .then(function (response) {
      const data = response.data;
      console.log(data); // Log the API response to the console for debugging

      if (data && data.city) {
        // Update UI with weather data
        document.getElementById("current-city").textContent = data.city;
        document.getElementById("current-date").textContent = formatDate(
          data.time * 1000
        ); // Format timestamp to readable date

        const currentTemperature = data.temperature.current;
        document.querySelector(".current-temperature-value").textContent =
          currentTemperature;

        const weatherCondition = data.condition.description;
        document.getElementById(
          "humidity"
        ).textContent = `Humidity: ${data.temperature.humidity}%`;
        document.getElementById(
          "wind"
        ).textContent = `Wind: ${data.wind.speed} m/s`;
        document.getElementById("weather-icon").src = data.condition.icon_url; // Update icon
      } else {
        alert("City not found!");
      }
    })
    .catch(function (error) {
      console.error("Error fetching weather data:", error);
    });
}

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString(undefined, options);
}
