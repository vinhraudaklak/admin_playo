import express from "express";
import {
	getAllBooking,
	getBookingById,
	getUserBookings,
	createBooking,
	createBookingWithPayment,
	updateBooking,
	deleteBooking,
	checkBookingAvailability,
} from "../controllers/booking.controller.js";
import { authMiddleware, checkRole, validate } from "../middlewares/index.js";
import {
	createBookingSchema,
	updateBookingSchema,
} from "../validators/index.js";

const router = express.Router();
router.get("/", authMiddleware, checkRole("admin"), getAllBooking);
router.get("/user/me", authMiddleware, getUserBookings);
router.post("/check-availability", authMiddleware, checkBookingAvailability);
router.post("/", authMiddleware,  createBooking); // validate(createBookingSchema),
router.post(
	"/with-payment",
	authMiddleware,
	validate(createBookingSchema),
	createBookingWithPayment
);
router.get("/:id", authMiddleware, getBookingById);
router.put(
	"/:id",
	authMiddleware,
	validate(updateBookingSchema),
	updateBooking
);
router.delete("/:id", authMiddleware, deleteBooking);

export default router;
