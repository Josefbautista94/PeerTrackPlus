const axios = require("axios"); // Importing Axios cause its great

const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"; // Gemini REST endpoint

const generateGeminiReply = async ({ topic, message }) => { // Creating an Async funtion that takes an object with topic and message

    const apiKey = process.env.GEMINI_API_KEY; // Retriving the API key

    if (!apiKey) {

        throw new Error("Missing GEMINI_API_KEY"); // Throw an error if theres no API key to be found

    }

    // Builds the prompt that we send to Gemini
    // Defaults prevent empty fields from breaking the prompt
    // topic || "general" Gives a default topic if none was provided
    // message || "N/A" avoids sending empty text
    const prompt = `
You are a helpful study assistant for PeerTrackPlus.
Topic: ${topic || "general"} 
Learner question: ${message || "N/A"}

Give a short helpful explanation, then one short practice question.
`;

    const response = await axios.post(
        GEMINI_URL, // Gemini API endpoint for generating text
        {
            // Request body structure expected by Gemini
            contents: [{ parts: [{ text: prompt }] }]     // "contents" is an array of message

        },
        {
            headers: {
                "Content-Type": "application/json", // Tells Gemini we are sending JSON data
                "x-goog-api-key": apiKey // API key used to authenticate this request
            },
            timeout: 15000 // Prevents the request from hanging forever if Gemini is slow or blocked
        }
    );

    // Safely extracts the generated text from the response using optional chaining.
    // If the response shape is missing or empty, we fall back to a default message.
    const text =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Here’s a helpful explanation related to this topic.";

    return { // Returns a consistent JSON shape for the frontend:
        reply: text,
        practice: "Try explaining this concept step by step in your own words."
    };
};

module.exports = { generateGeminiReply }