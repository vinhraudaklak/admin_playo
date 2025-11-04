import express from "express";

import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import categoryRoutes from "./category.routes.js";
import fieldRoutes from "./field.routes.js";
import slotRoutes from "./slot.routes.js";
import bookingRoutes from "./booking.routes.js";
import paymentRoutes from "./payment.routes.js";
import reviewRoutes from "./review.routes.js";

const router = express.Router();

// Mount tất cả routes
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/sports", categoryRoutes); 
router.use("/venues", fieldRoutes); 
router.use("/slots", slotRoutes);
router.use("/bookings", bookingRoutes); 
router.use("/payments", paymentRoutes);
router.use("/reviews", reviewRoutes); 
// router.use("/cart", cartRoutes);

export default router;
