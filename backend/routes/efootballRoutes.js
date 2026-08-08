import express from "express";
import {
  getAccounts,
  getAccountById,
  createAccount,
  updateAccount,
  deleteAccount,
} from "../controllers/efootballController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAccounts);
router.get("/:id", getAccountById);
router.post("/", protect, adminOnly, createAccount);
router.put("/:id", protect, adminOnly, updateAccount);
router.delete("/:id", protect, adminOnly, deleteAccount);

export default router;
