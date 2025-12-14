// AI controllers will live here

// These functions handle incoming API requests and return JSON responses.
// Controllers should stay lightweight, they call services to do the real logic

const { generateAdminInsights } = require("../services/aiInsights.service");
const { generateTutorMatches } = require("../services/aiMatch.service");
const { generateGeminiReply } = require("../services/gemini.service");




// POST /api/ai/match
const matchTutors = (req, res) => { // We return a ranked list of tutor matches with scores + human readable reasons
  const { topic, level } = req.body;   // Pull the learner's inputs from the request body

  if (!topic) {
    return res.status(400).json({ error: "topic is required" });   // Basic validation, topic is required for matching
  }

  // mock tutors for Minimum Viable Product
  // Later we can replace this with real tutors pulled from MongoDB
  const tutors = [
    { tutorId: "t1", name: "Alex", skills: ["react", "javascript", "apis"], available: true, active: true },
    { tutorId: "t2", name: "Sam", skills: ["node", "express", "mongodb"], available: true, active: false },
    { tutorId: "t3", name: "Jordan", skills: ["python", "data", "javascript"], available: false, active: true },
    { tutorId: "t4", name: "Taylor", skills: ["react", "css", "ui"], available: true, active: true }
  ];

  const matches = generateTutorMatches({ topic, level, tutors }); // Generate ranked matches using the matching service

  res.json({ matches }); // return results in JSON for the frontend to display
};

const aiChat = async (req, res) => { //	Defines the AI chat controller
  const { topic, message } = req.body || {}; // Pulls user input from the request body, || {} prevents errors if req.body is undefined

  try {
    const data = await generateGeminiReply({ topic, message }); // Calls the Gemini service
    res.json(data); // 	Sends the AI response back to the frontend
  } catch (err) {
      console.error("Gemini error:", err.response?.data || err.message);
    // Safe fallback for MVP/demo
    res.json({
      reply: `This is a helpful hint about ${topic || "this topic"}.`, // 	Returns a static response if AI fails
      practice: "Try explaining this concept step by step."
    });
  }
}

// GET /api/ai/admin-insights
// Admin endpoint that returns quick, high-level insights for the dashboard
// For the Minimum Viable Product this can be static or mock data, later it can be generated from real DB
const adminInsights = (req, res) => {
  const insights = generateAdminInsights();
  res.json({ insights });
};

module.exports = {
  matchTutors,
  aiChat,
  adminInsights
};