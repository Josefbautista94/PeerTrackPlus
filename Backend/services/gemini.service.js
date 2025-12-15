import axios from "axios";

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

export const generateGeminiReply = async ({ topic, message }) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("Missing GEMINI_API_KEY");

const prompt = `Explain this clearly in plain text.
Topic: ${topic || "general"}
Question: ${message || "N/A"}

Keep it short and beginner-friendly.`;

  const res = await axios.post(
    GEMINI_URL,
    { contents: [{ parts: [{ text: prompt }] }] },
    {
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      timeout: 15000,
    }
  );

  const text =
    res.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "Here’s a helpful explanation related to this topic.";

  return {
  reply: text,
  practice: ""
};
};