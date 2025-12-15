// aiChat.service.js
// AI study assistant logic will live here
// MVP used a static response, now we call Gemini and keep a safe fallback

import { generateGeminiReply } from "./gemini.service.js";

/**
 * Generates a study assistant response for learners.
 * Always returns a consistent shape:
 * { reply: string, practice: string }
 */
export const generateStudyResponse = async (topic, message) => {
  try {
    // Call Gemini
    const result = await generateGeminiReply({ topic, message });

    // Defensive fallback if Gemini returns something unexpected
    return {
      reply: result?.reply || `Here is a helpful explanation about ${topic || "this topic"}.`,
      practice:
        result?.practice ||
        "Try explaining this concept step by step in your own words.",
    };
  } catch (err) {
    console.error("Gemini failed, using fallback:", err.message);

    // Fallback so your app still works if Gemini errors out
    return {
      reply: `Here is a quick hint about ${topic || "this topic"}: break it into small steps and test each part.`,
      practice: "Practice: explain it in one sentence, then give a small example.",
    };
  }
};