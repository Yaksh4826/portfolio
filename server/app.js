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
import authRoutes from "./routes/authRoutes.js";
import servicesRoutes from "./routes/servicesRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import bcrypt from "bcryptjs";
import User from "./models/userModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables (no-op on Vercel if not present)
dotenv.config({ path: path.join(__dirname, ".env") });

// Initialize database connection once per cold start
connectDB();

// Seed an admin if configured and not present
async function ensureAdmin() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminEmail || !adminPassword) return;
    const existing = await User.findOne({ email: adminEmail });
    if (!existing) {
      const hashed = await bcrypt.hash(adminPassword, 10);
      await User.create({ name: "Admin", email: adminEmail, password: hashed, role: "admin" });
      console.log("✅ Seeded admin user");
    }
  } catch (e) {
    console.error("Failed to seed admin:", e.message);
  }
}
ensureAdmin();

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || true, credentials: true }));
app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/qualifications", qualificationsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/about", aboutRoutes);

// Health route
app.get("/", (req, res) => {
  res.send("{message : Welcome to my portfolio application}");
});

export default app;


