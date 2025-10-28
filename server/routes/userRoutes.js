import express from "express";
import {
  getUsers,
  getUserById,
  signup,
  signin,
  updateUser,
  deleteUser,
  deleteAllUsers,
  signout,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// CRUD
router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", protect, signup);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);
router.delete("/", protect, deleteAllUsers);

// Auth
router.post("/signin", signin);
router.post("/signup", signup);
router.post("/signout", protect, signout);

export default router;
