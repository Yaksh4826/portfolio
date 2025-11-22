import express from "express";
import {
  getQualifications,
  getQualificationById,
  createQualification,
  updateQualification,
  deleteQualification,
  deleteAllQualifications,
} from "../controllers/qualificationsController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getQualifications);
router.get("/:id", getQualificationById);
router.post("/", protect, authorize("admin"), createQualification);
router.put("/:id", protect, authorize("admin"), updateQualification);
router.delete("/:id", protect, authorize("admin"), deleteQualification);
router.delete("/", protect, authorize("admin"), deleteAllQualifications);

export default router;
