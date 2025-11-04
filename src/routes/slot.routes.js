import express from "express";
import {
	getAllSlots,
	getSlotById,
	createSlot,
	updateSlot,
	deleteSlot,
	joinSlot,
	leaveSlot,
} from "../controllers/slot.controller.js";
import { authMiddleware, checkRole, validate } from "../middlewares/index.js";
import { createSlotSchema, updateSlotSchema } from "../validators/index.js";

const router = express.Router();

router.get("/", getAllSlots);
router.get("/:id", getSlotById);
router.post("/", authMiddleware, validate(createSlotSchema), createSlot);
router.put("/:id", authMiddleware, updateSlot);
router.delete("/:id", authMiddleware, deleteSlot);

// 🟢 Người dùng xin tham gia slot
router.post("/:id/join", authMiddleware, joinSlot);
router.post("/:id/leave", authMiddleware, leaveSlot);

export default router;
