import Joi from "joi";

export const createSlotSchema = Joi.object({
  venueId: Joi.number().integer().required(),
  sportId: Joi.number().integer().optional(),
  level: Joi.string().optional(),
  listUsers: Joi.array().items(Joi.number().integer()).optional(),
  date: Joi.date().required(),
  startTime: Joi.string().pattern(/^\d{2}:\d{2}$/).required(),
  endTime: Joi.string().pattern(/^\d{2}:\d{2}$/).required(),
  isAvailable: Joi.boolean().default(true),
});

export const updateSlotSchema = Joi.object({
  sportId: Joi.number().integer().optional(),
  level: Joi.string().optional(),
  listUsers: Joi.array().items(Joi.number().integer()).optional(),
  date: Joi.date().optional(),
  startTime: Joi.string().pattern(/^\d{2}:\d{2}$/).optional(),
  endTime: Joi.string().pattern(/^\d{2}:\d{2}$/).optional(),
  isAvailable: Joi.boolean().optional(),
});
