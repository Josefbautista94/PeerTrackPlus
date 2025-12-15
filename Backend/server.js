import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connect from "./controllers/dbConnect.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import aiRoutes from "./routes/ai.routes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config({ path: new URL("./.env", import.meta.url) });

// Create express app FIRST
const app = express();
const PORT = process.env.PORT || 5000;

// ---------- Global Middleware (ORDER MATTERS) ----------

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies (forms)
app.use(express.urlencoded({ extended: true }));

// CORS configuration (must be before routes)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ---------- Test Route ----------
app.post("/test", (req, res) => {
  console.log("Test route - req.body:", req.body);
  res.json({ body: req.body });
});

// ---------- Routes ----------
app.use("/api/auth", authRoutes); // register / login
app.use("/api", userRoutes);      // user routes
app.use("/api", postRoutes);      // help request routes
app.use("/api/ai", aiRoutes);     // AI routes

// ---------- Database ----------
connect();

// ---------- Root ----------
app.get("/", (req, res) => {
  res.send("PeerTrack+ backend is running!");
});

// ---------- Server ----------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});