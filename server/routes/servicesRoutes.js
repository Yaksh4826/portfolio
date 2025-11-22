import express from "express";
import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  deleteAllServices,
} from "../controllers/servicesController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getServices);
router.get("/:id", getServiceById);

// Admin-only routes
router.post("/", protect, authorize("admin"), createService);
router.put("/:id", protect, authorize("admin"), updateService);
router.delete("/:id", protect, authorize("admin"), deleteService);
router.delete("/", protect, authorize("admin"), deleteAllServices);

export default router;

