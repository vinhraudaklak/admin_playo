import express from "express";
import {
  getAllSlots,
  getSlotById,
  createSlot,
  updateSlot,
  deleteSlot,
} from "../controllers/venueSlot.controller.js";
import { validate } from "../middlewares/validate.js";
import { createSlotSchema, updateSlotSchema } from "../validators/venueSlot.validator.js";

const router = express.Router();

router.get("/", getAllSlots);
router.get("/:id", getSlotById);
router.post("/", validate(createSlotSchema), createSlot);
router.put("/:id", validate(updateSlotSchema), updateSlot);
router.delete("/:id", deleteSlot);

export default router;
