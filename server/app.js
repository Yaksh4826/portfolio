import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import qualificationsRoutes from "./routes/qualificationsRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables (no-op on Vercel if not present)
dotenv.config({ path: path.join(__dirname, ".env") });

// Initialize database connection once per cold start
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/contacts", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/qualifications", qualificationsRoutes);
app.use("/api/users", userRoutes);

// Health route
app.get("/", (req, res) => {
  res.send("{message : Welcome to my portfolio application}");
});

export default app;


