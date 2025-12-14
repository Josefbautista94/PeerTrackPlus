import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";  // Add this
import connect from "./controllers/dbConnect.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import aiRoutes from "./routes/ai.routes.js";
import authRoutes from "./routes/authRoutes.js"
dotenv.config();

// variables for express and middlewares
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Also add this for good measure
app.use(cors());

app.post("/test", (req, res) => {
    console.log("Test route - req.body:", req.body);
    res.json({ body: req.body });
});


// Routes
app.use("/api/auth", authRoutes); //register and auth routes
app.use("/api/", userRoutes); // user routes for get, update and delete
app.use("/api/", postRoutes); // help request routes
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