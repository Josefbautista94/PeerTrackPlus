// AI controllers will live here

const { generateAdminInsights } = require("../services/aiInsights.service");

const matchTutors = (req, res) => {
  res.json({
    matches: [
      { tutorId: "t1", score: 92, reason: "Strong topic match and recent tutoring activity" },
      { tutorId: "t2", score: 85, reason: "Relevant experience and availability" }
    ]
  });
};

const aiChat = (req, res) => {
  const { topic } = req.body;

  res.json({
    reply: `Here’s a quick explanation related to ${topic}.`,
    practice: "Can you explain this concept in your own words?"
  });
};

const adminInsights = (req, res) => {
  const insights = generateAdminInsights();
  res.json({ insights });
};

module.exports = {
  matchTutors,
  aiChat,
  adminInsights
};