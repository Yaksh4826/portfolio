import express from "express";
import {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  deleteAllContacts,
} from "../controllers/contactController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getContacts);
router.get("/:id", getContactById);
router.post("/", createContact);
router.put("/:id", protect, authorize("admin"), updateContact);
router.delete("/:id", protect, authorize("admin"), deleteContact);
router.delete("/", protect, authorize("admin"), deleteAllContacts);

export default router;
