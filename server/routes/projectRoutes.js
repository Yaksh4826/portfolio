import express from "express";
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  deleteAllProjects,
} from "../controllers/projectController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProjects);
router.get("/:id", getProjectById);
router.post("/", protect, authorize("admin"), createProject);
router.put("/:id", protect, authorize("admin"), updateProject);
router.delete("/:id", protect, authorize("admin"), deleteProject);
router.delete("/", protect, authorize("admin"), deleteAllProjects);

export default router;
