import Joi from "joi";

export const createReviewSchema = Joi.object({
  userId: Joi.number().integer().required(),
  fieldId: Joi.number().integer().required(),
  rating: Joi.number().min(1).max(5).required(), // 1–5 sao
  comment: Joi.string().allow("").max(500),      // cho phép để trống
});

export const updateReviewSchema = Joi.object({
  rating: Joi.number().min(1).max(5),
  comment: Joi.string().allow("").max(500),
});
