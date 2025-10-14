import express from "express";
import { createSlot, getAllSlots, updateSlot, deleteSlot } from "../controllers/slot.controller.js";
import { authMiddleware, checkRole } from "../middlewares/index.js";
import { validate } from "../middlewares/validate.js";
import { createSlotSchema, updateSlotSchema } from "../validators/index.js";

const router = express.Router();

router.post("/", authMiddleware, checkRole("admin"), validate(createSlotSchema), createSlot);
router.get("/", getAllSlots);
router.put("/:id", authMiddleware, checkRole("admin"), validate(updateSlotSchema), updateSlot);
router.delete("/:id", authMiddleware, checkRole("admin"), deleteSlot);

export default router;
