// AI routes will live here

const express = require("express");
const {
  matchTutors,
  aiChat,
  adminInsights
} = require("../controllers/ai.controller");

const router = express.Router();

router.post("/match", matchTutors);
router.post("/chat", aiChat);
router.get("/admin-insights", adminInsights);

module.exports = router;