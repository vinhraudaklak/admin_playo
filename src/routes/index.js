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
router.use("/auth", authRoutes); // handle login, logout, register, refreshToken. OK
router.use("/users", userRoutes); // handle get all user, get user, update + delete user. OK
// router.use("/roles", roleRoutes);    // k có bản model.
router.use("/categories", categoryRoutes); // handle category sport. OK
// router.use("/positions", positionRoutes); // k có bản model.
router.use("/fields", fieldRoutes); // handle lấy all sân, 1 sân, sửa-tạo-xóa sân. OK
router.use("/slots", slotRoutes);
router.use("/bookings", bookingRoutes);
router.use("/payments", paymentRoutes);
router.use("/reviews", reviewRoutes);

export default router;
