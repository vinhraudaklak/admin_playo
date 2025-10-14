import express from "express";
import { createPayment, getAllPayments, updatePayment } from "../controllers/payment.controller.js";
import { authMiddleware } from "../middlewares/index.js";
import { validate } from "../middlewares/validate.js";
import { createPaymentSchema, updatePaymentSchema } from "../validators/index.js";

const router = express.Router();

router.post("/", authMiddleware, validate(createPaymentSchema), createPayment);
router.get("/", authMiddleware, getAllPayments);
router.put("/:id", authMiddleware, validate(updatePaymentSchema), updatePayment);

export default router;
