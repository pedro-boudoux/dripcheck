import axios from "axios";
import "dotenv/config";

export async function getWeatherData(city) {
    const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;

    try {
        let response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_API_KEY}&units=metric`,
        );

        let weatherData = {
            city: response.data.name,
            temp: response.data.main.temp,
            feelsLike: response.data.main.feels_like,
        };

        console.log(weatherData);

        return weatherData;
    } catch (error) {
        console.log("Error: ", error.message);
    }
}
