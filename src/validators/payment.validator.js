import Joi from "joi";

export const createPaymentSchema = Joi.object({
  bookingId: Joi.number().integer().required(),
  payment_method: Joi.string().valid("cash", "card", "wallet", "upi").required(),
});

export const updatePaymentSchema = Joi.object({
  status: Joi.string().valid("pending", "completed", "failed"),
});
