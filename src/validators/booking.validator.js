import Joi from "joi";

export const createBookingSchema = Joi.object({
  userId: Joi.number().integer().required(),
  fieldId: Joi.number().integer().required(),
  slotId: Joi.number().integer().required(),
  status: Joi.string().valid("pending", "confirmed", "cancelled").default("pending"),
  payment_status: Joi.string().valid("unpaid", "paid").default("unpaid"),
});

export const updateBookingSchema = Joi.object({
  status: Joi.string().valid("pending", "confirmed", "cancelled"),
  payment_status: Joi.string().valid("unpaid", "paid"),
});
