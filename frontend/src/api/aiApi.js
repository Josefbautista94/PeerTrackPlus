import axios from "axios"

// Base URL for backend AI routes
const API_BASE = `${import.meta.env.VITE_API_URL}/api/ai`;


// Sends a message to the AI study assistant
// It's going to accept objects with :
// 1. A topic which is what the learner is asking about
// 2. A message which is the learners question
export const sendAiMessage = async ({ topic, message }) => {

    // This makes a POST request to /api/ai/chat 
    // Mirrors the curl command used to test the backend
    const response = await axios.post(`${API_BASE}/chat`, { topic, message });

    return response.data // Returns the JSON response from the backend : {reply: string, practice: string}
}