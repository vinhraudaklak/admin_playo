import express from "express";
import { getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/user.controller.js";
import { authMiddleware, checkRole } from "../middlewares/index.js";

const router = express.Router();

router.get("/", authMiddleware, checkRole("admin"), getAllUsers); // Chỉ admin được xem danh sách toàn bộ user
router.get("/:id", authMiddleware, getUserById); // Bất kỳ user nào đăng nhập hợp lệ đều có thể xem thông tin user cụ thể
router.put("/:id", authMiddleware, updateUser);  // User nào cũng có thể update thông tin của chính họ
router.delete("/:id", authMiddleware, checkRole("admin"), deleteUser); // Chỉ admin mới được xóa user

export default router;
