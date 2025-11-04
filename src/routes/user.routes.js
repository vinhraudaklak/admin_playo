import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  createUser,
  deleteUser,
  getCurrentUser,
} from "../controllers/user.controller.js";
import { authMiddleware, checkRole } from "../middlewares/index.js";

const router = express.Router();

// ✅ Route mới: Lấy thông tin người dùng hiện tại (qua token)
router.get("/me", authMiddleware, getCurrentUser);

router.get("/", authMiddleware, checkRole("admin"), getAllUsers);
router.get("/:id", authMiddleware, getUserById);
router.put("/:id", authMiddleware, updateUser);
router.post("/", authMiddleware, checkRole("admin"), createUser);
router.delete("/:id", authMiddleware, checkRole("admin"), deleteUser);

export default router;
