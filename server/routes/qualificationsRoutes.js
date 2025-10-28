import express from "express";
import {
  getQualifications,
  getQualificationById,
  createQualification,
  updateQualification,
  deleteQualification,
  deleteAllQualifications,
} from "../controllers/qualificationsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getQualifications);
router.get("/:id", getQualificationById);
router.post("/", protect, createQualification);
router.put("/:id", protect, updateQualification);
router.delete("/:id", protect, deleteQualification);
router.delete("/", protect, deleteAllQualifications);

export default router;
