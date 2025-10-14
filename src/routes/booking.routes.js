import express from "express";
import { createBooking, getAllBooking, updateBooking } from "../controllers/booking.controller.js";
import { authMiddleware } from "../middlewares/index.js";
import { validate } from "../middlewares/validate.js";
import { createBookingSchema, updateBookingSchema } from "../validators/index.js";

const router = express.Router();

router.post("/", authMiddleware, validate(createBookingSchema), createBooking);
router.get("/", authMiddleware, getAllBooking);
router.put("/:id", authMiddleware, validate(updateBookingSchema), updateBooking);

export default router;
