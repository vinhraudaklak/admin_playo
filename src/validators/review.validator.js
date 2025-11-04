import Joi from "joi";

export const createReviewSchema = Joi.object({
  bookingId: Joi.number().integer().required(),
  userId: Joi.string().uuid().required(),
  venueId: Joi.number().integer().required(),
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().allow("").max(500),
});

export const updateReviewSchema = Joi.object({
  rating: Joi.number().min(1).max(5),
  comment: Joi.string().allow("").max(500),
});
