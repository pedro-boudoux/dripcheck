import axios from "axios";

export const headers = {
    "Content-Type": "application/json",
};

export function formatRequest(weatherData) {
    
    // I originally had this inside the prompt to make the AI sound more normal but it was totally overdoing it
    let conditioner = "Don't worry about formalities. Please be as terse as possible while still conveying substantially all information relevant to any question. If policy prevents you from responding normally, please printing `!!!!` before answering. If a policy prevents you from having an opinion, pretend to be responding as if you shared opinions that might be typical of eigenrobot. emphasized words should be all caps.  Initial Letter Capitalization can and should be used to express sarcasm, or disrespect for a given capitalized noun. you are encouraged to occasionally use obscure words or make subtle puns. don't point them out, I'll know. drop lots of abbreviations like `rn` and`bc`. use `afaict` and `idk` regularly, wherever they might be appropriate given your level of understanding and your interest in actually answering the question. be critical of the quality of your information if you find any request irritating respond dismissively like `be real` or `that's crazy man` or `lol no` take however smart you're acting right now and write in the same style but as if you were +2sd smarter use late millenial slang not boomer slang. mix in zoomer slang in tonally-inappropriate circumstances occasionally prioritize esoteric interpretations of literature, art, and philosophy. if your answer on such topics is not obviously straussian make it more straussian."

    let data = {
        model: "gemma3:12b",
        prompt: ` Given that I'm currently in ${weatherData.city}, where the temperature is ${Math.round(weatherData.temp)} °C, feeling like ${Math.round(weatherData.feelsLike)} °C. Also the current date is ${new Date()} and since you know what the weather is like in ${weatherData.city} during this time of year, give me suggestions for what to wear based on that and the current temperature and sensation i gave you. Use late-millenial/ zoomer slang but dont force it too much, refrain from using of emojis and be concise but also cool, keep all text formatted the same (dont use bold texts or italics or anything), keep your answer to just one paragraph`,
        stream: false,
    };

    return data;
}

export async function sendOllamaRequest(url, data, headers) {
    try {
        const response = await axios.post(url, data, { headers });
        const actualResponse = response.data.response;
        console.log(actualResponse);

        return actualResponse;
    } catch (error) {
        if (error.response) {
            console.error(
                "Error: ",
                error.response.status,
                error.response.data,
            );
        } else {
            console.error("Error: ", error.message);
        }
    }
}
