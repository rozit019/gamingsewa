import express from "express";
import multer from "multer";
import {
  getAccounts,
  getAccountById,
  createAccount,
  updateAccount,
  deleteAccount,
} from "../controllers/efootballController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// PUBLIC — anyone can view
router.get("/", getAccounts);
router.get("/:id", getAccountById);

// PROTECTED — admin only
router.post("/", protect, adminOnly, upload.single("image"), createAccount);
router.put("/:id", protect, adminOnly, upload.single("image"), updateAccount);
router.delete("/:id", protect, adminOnly, deleteAccount);

export default router;
