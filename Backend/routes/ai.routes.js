// AI routes will live here

import express from "express"

import{
matchTutors,
aiChat,
adminInsights
} from "../controllers/ai.controller.js"

const router = express.Router.js

router.post("/match", matchTutors);
router.post("/chat", aiChat);
router.get("/admin-insights", adminInsights);

export default router;