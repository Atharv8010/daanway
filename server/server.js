import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import donationRoutes from "./routes/donations.js";
import ngoRoutes from "./routes/ngos.js";
import rewardRoutes from "./routes/rewards.js";

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: [
      "https://daanway.vercel.app", // frontend (Vercel)
      "http://localhost:5173"       // local development
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Body parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/ngos", ngoRoutes);
app.use("/api/rewards", rewardRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// Default route (to prevent "Cannot GET /")
app.get("/", (req, res) => {
  res.send("DaanWay backend is live ✅");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
