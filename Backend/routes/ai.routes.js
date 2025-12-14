// AI routes will live here

// This file maps API endpoints to their corresponding controller functions

const express = require("express");
const {
  matchTutors,
  aiChat,
  adminInsights
} = require("../controllers/ai.controller");

const router = express.Router();
// POST /api/ai/match
// Learner submits a topic and receives ranked tutor matches
router.post("/match", matchTutors);

// POST /api/ai/chat
// AI study assistant endpoint for hints and explanations
router.post("/chat", aiChat);

// GET /api/ai/admin-insights
// Admin endpoint for high-level insights and trends
router.get("/admin-insights", adminInsights);

module.exports = router;