import express from "express";
import { signin, signup, signout, me } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Spec-compliant auth endpoints
router.post("/signin", signin);
router.post("/signup", signup);
router.get("/signout", protect, signout);
router.get("/me", protect, me);

export default router;


