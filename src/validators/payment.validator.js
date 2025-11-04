import Joi from "joi";

/* ==========================
   💰 CREATE PAYMENT
========================== */
export const createPaymentSchema = Joi.object({
  bookingId: Joi.number().integer().required().messages({
    "any.required": "bookingId is required",
    "number.base": "bookingId must be a number",
  }),

  // FE không gửi userId, backend lấy từ req.user.id
  userId: Joi.forbidden(),

  paymentMethod: Joi.string()
    .valid("COD", "BANK")
    .required()
    .messages({
      "any.required": "paymentMethod is required",
      "any.only": "paymentMethod must be one of [COD, BANK]",
    }),

  amount: Joi.number().precision(2).required().messages({
    "any.required": "amount is required",
    "number.base": "amount must be a valid number",
  }),

  status: Joi.string()
    .valid("pending", "complete", "failed")
    .default("pending"),

  transactionId: Joi.string().allow(null, "").optional(),
});

/* ==========================
   ✏️ UPDATE PAYMENT
========================== */
export const updatePaymentSchema = Joi.object({
  paymentMethod: Joi.string()
    .valid("COD", "BANK")
    .optional(),

  status: Joi.string()
    .valid("pending", "complete", "failed")
    .optional(),

  transactionId: Joi.string().allow(null, "").optional(),
}).min(1);
