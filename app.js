import express from "express"
import OpenAI from "openai"
import 'dotenv/config';
import bodyParser from "body-parser"
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
const OPEN_API_KEY = process.env['OPENAI_API_KEY']
const OPEN_WEATHER_API_KEY = process.env['OPENWEATHER_API_KEY']

var city = '';

app.use(bodyParser.urlencoded({extended: true}));



const ai = new OpenAI({
    apiKey: OPEN_API_KEY,
});

async function processUserInput(weatherData) {
    //console.log("processing:", weatherData);

    const chatResponse = await ai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: `The weather in my city is ${weatherData.temp} in Kelvin, what should I wear?` }],
    });

    //console.log("chatgpt response:", chatResponse.choices[0].message.content);
    return chatResponse.choices[0].message.content;
}

app.get("/", (req, res) => {
    res.sendFile(__dirname + `/public/index.html`)
})

app.post("/submit", async (req, res) => {
    console.log("submitting");
    //console.log(req.body.city);
    const city = req.body.city;

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_API_KEY}`);
        const data = await response.json();
        console.log(data);

        var chatGptResponse = processUserInput(data)
        //console.log(chatGptResponse);


        res.send(`<h1>${chatGptResponse.choices[0].message.content}</h1>`);
    } catch (error) {
        console.error("error fetching weather:", error);
        res.status(500).send("error fetching weather");
    }
});

app.listen(port, (req, res) => {
    console.log(`App running on port ${port}`);
})