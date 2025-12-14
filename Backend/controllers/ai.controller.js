// AI controllers will live here

// These functions handle incoming API requests and return JSON responses.
// Controllers should stay lightweight, they call services to do the real login

const { generateAdminInsights } = require("../services/aiInsights.service");
const { generateTutorMatches } = require("../services/aiMatch.service");



// POST /api/ai/match
const matchTutors = (req, res) => { // We return a ranked list of tutor matches with scores + human readable reasons
  const { topic, level } = req.body;   // Pull the learner's inputs from the request body

  if (!topic) {
    return res.status(400).json({ error: "topic is required" });   // Basic validation, topic is required for matching
  }

  // mock tutors for Minimum Viable Product
  // Later we can replace this with real tutors pulled from Mongo DB
  const tutors = [
    { tutorId: "t1", name: "Alex", skills: ["react", "javascript", "apis"], available: true, active: true },
    { tutorId: "t2", name: "Sam", skills: ["node", "express", "mongodb"], available: true, active: false },
    { tutorId: "t3", name: "Jordan", skills: ["python", "data", "javascript"], available: false, active: true },
    { tutorId: "t4", name: "Taylor", skills: ["react", "css", "ui"], available: true, active: true }
  ];

  const matches = generateTutorMatches({ topic, level, tutors }); // Generate ranked matches using the matching service

  res.json({ matches }); // return results in JSON for the frontend to display
};

// POST /api/ai/chat
// AI study assistant endpoint
// For Minimum Viable Product this returns a simple helpful response
// Laterrrr we can swap this out to call a real AI model (Gemini) with fall back
const aiChat = (req, res) => {
  const { topic } = req.body;

  res.json({
    reply: `Here’s a quick explanation related to ${topic}.`,
    practice: "Can you explain this concept in your own words?"
  });
};

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