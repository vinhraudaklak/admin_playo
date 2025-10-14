import Joi from "joi";

export const createFieldSchema = Joi.object({
  name: Joi.string().min(3).required(),
  categoryId: Joi.number().integer().required(),
  positionId: Joi.number().integer().required(),
  price: Joi.number().positive().required(),
  surface_type: Joi.string().valid("grass", "turf", "clay", "hard").required(),
  amenities: Joi.array().items(Joi.string()).default([]),
  stock: Joi.number().integer().min(1).default(1),
  status: Joi.string().valid("available", "maintenance", "unavailable").default("available"),
});

export const updateFieldSchema = Joi.object({
  name: Joi.string().min(3),
  categoryId: Joi.number().integer(),
  positionId: Joi.number().integer(),
  price: Joi.number().positive(),
  surface_type: Joi.string().valid("grass", "turf", "clay", "hard"),
  amenities: Joi.array().items(Joi.string()),
  stock: Joi.number().integer().min(1),
  status: Joi.string().valid("available", "maintenance", "unavailable"),
});
