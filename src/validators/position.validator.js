import Joi from "joi";

export const createPositionSchema = Joi.object({
  name: Joi.string().min(2).required(),   // VD: Quận 1, Hà Nội, vv
  district: Joi.string().min(2).required(),
});

export const updatePositionSchema = Joi.object({
  name: Joi.string().min(2),
  district: Joi.string().min(2),
});
