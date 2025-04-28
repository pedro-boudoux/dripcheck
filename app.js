import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { getWeatherData } from "./weather.js";
import { formatRequest, sendOllamaRequest } from "./API/api.js";
import { headers } from "./API/api.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", express.static("public"));
const port = 3000;
const API_URL = "http://localhost:11434/api/generate";

let city;

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/submit", async (req, res) => {
    city = req.body.city;

    let weatherData = await getWeatherData(city);
    let data = formatRequest(weatherData);
    let aiResponse = await sendOllamaRequest(API_URL, data, headers);

    res.render("index.ejs", { suggestion: aiResponse });
});

app.listen(port, (req, res) => {
    console.log(`App running on port ${port}`);
});
