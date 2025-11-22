import express from "express";
import {
  getAbout,
  updateAbout,
  deleteAbout,
} from "../controllers/aboutController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route
router.get("/", getAbout);

// Admin-only routes
router.put("/", protect, authorize("admin"), updateAbout);
router.delete("/", protect, authorize("admin"), deleteAbout);

export default router;

