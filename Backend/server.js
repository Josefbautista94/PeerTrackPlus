import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connect from "./controllers/dbConnect.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import aiRoutes from "./routes/ai.routes.js";

dotenv.config();

// variables for express and middlewares
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // this always goes before routes
app.use(cors());

// Routes
app.use("/api/", userRoutes);
app.use("/api/", postRoutes);
app.use("/api/ai", aiRoutes); // AI routes (matching, chat, admin insights)
connect();

/// place holder route
app.get("/", (req, res) => {
  res.send("PeerTrack+ backend is running!");
});

//server running
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});