import express from "express";
import { getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/user.controller.js";
import { authMiddleware, checkRole } from "../middlewares/index.js";

const router = express.Router();

router.get("/", authMiddleware, checkRole("admin"), getAllUsers);
router.get("/:id", authMiddleware, getUserById);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, checkRole("admin"), deleteUser);

export default router;
