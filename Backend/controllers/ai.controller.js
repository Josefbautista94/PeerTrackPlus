// AI controllers will live here
// Controllers stay lightweight and delegate logic to services

import { generateAdminInsights } from "../services/aiInsights.service.js";
import { generateTutorMatches } from "../services/aiMatch.service.js";
import { generateStudyResponse } from "../services/aiChat.service.js";

// POST /api/ai/match
const matchTutors = (req, res) => {
  const { topic, level } = req.body;

  if (!topic) {
    return res.status(400).json({ error: "topic is required" });
  }

  // Mock tutors for MVP
  const tutors = [
    { tutorId: "t1", name: "Alex", skills: ["react", "javascript", "apis"], available: true, active: true },
    { tutorId: "t2", name: "Sam", skills: ["node", "express", "mongodb"], available: true, active: false },
    { tutorId: "t3", name: "Jordan", skills: ["python", "data", "javascript"], available: false, active: true },
    { tutorId: "t4", name: "Taylor", skills: ["react", "css", "ui"], available: true, active: true }
  ];

  const matches = generateTutorMatches({ topic, level, tutors });
  res.json({ matches });
};

// POST /api/ai/chat
const aiChat = async (req, res) => {
  const { topic, message } = req.body || {};

  try {
    const data = await generateStudyResponse(topic, message);
    return res.json(data);
  } catch (err) {
    console.error("AI chat error:", err.message);
    return res.json({
      reply: `Quick hint (${topic || "general"}): break the problem into small steps and verify what changes at each step.`,
      practice: "Practice: What is one common beginner mistake here?"
    });
  }
};

// GET /api/ai/admin-insights
const adminInsights = (req, res) => {
  const insights = generateAdminInsights();
  res.json({ insights });
};

export {
  matchTutors,
  aiChat,
  adminInsights
};