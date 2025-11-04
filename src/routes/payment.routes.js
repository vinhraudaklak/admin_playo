import express from "express";
import {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
  createOnlinePayment,
  handlePaymentCallback,
} from "../controllers/payment.controller.js";
import { authMiddleware, checkRole, validate } from "../middlewares/index.js";
import {
  createPaymentSchema,
  updatePaymentSchema,
} from "../validators/index.js";

const router = express.Router();

// 🧾 Admin – Lấy tất cả payments
router.get("/", authMiddleware, checkRole("admin"), getAllPayments);

// 🔍 Chi tiết payment
router.get("/:id", authMiddleware, getPaymentById);

// 💰 Thanh toán COD / Bank
router.post("/", authMiddleware, validate(createPaymentSchema), createPayment);

// 🌐 Tạo thanh toán online
router.post("/create-online", authMiddleware, createOnlinePayment);

// 🔄 Callback từ Stripe / Momo / VNPay
router.get("/callback/:provider", handlePaymentCallback);

// 🔄 Admin xác nhận COD
router.put(
  "/:id",
  authMiddleware,
  checkRole("admin"),
  validate(updatePaymentSchema),
  updatePayment
);

// ❌ Xoá payment
router.delete("/:id", authMiddleware, checkRole("admin"), deletePayment);

export default router;
