import Joi from "joi";

export const createSlotSchema = Joi.object({
  fieldId: Joi.number().integer().required(),
  start_time: Joi.date().required(),
  end_time: Joi.date().greater(Joi.ref("start_time")).required(),
  status: Joi.string().valid("available", "booked", "cancelled").default("available"),
});

export const updateSlotSchema = Joi.object({
  start_time: Joi.date(),
  end_time: Joi.date().greater(Joi.ref("start_time")),
  status: Joi.string().valid("available", "booked", "cancelled"),
});
