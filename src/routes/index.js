import express from "express";

import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import roleRoutes from "./role.routes.js";
import categoryRoutes from "./category.routes.js";
import positionRoutes from "./position.routes.js";
import fieldRoutes from "./field.routes.js";
import slotRoutes from "./slot.routes.js";
import bookingRoutes from "./booking.routes.js";
import paymentRoutes from "./payment.routes.js";
import reviewRoutes from "./review.routes.js";

const router = express.Router();

// Mount tất cả routes
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/roles", roleRoutes);
router.use("/categories", categoryRoutes);
router.use("/positions", positionRoutes);
router.use("/fields", fieldRoutes);
router.use("/slots", slotRoutes);
router.use("/bookings", bookingRoutes);
router.use("/payments", paymentRoutes);
router.use("/reviews", reviewRoutes);

export default router;
