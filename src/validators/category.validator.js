import Joi from "joi";

export const createCategorySchema = Joi.object({
	name: Joi.string().min(2).required(),
	description: Joi.string().allow("").optional(),
	imgUrl: Joi.string().uri().allow("").optional(),
});

export const updateCategorySchema = Joi.object({
	name: Joi.string().min(2).optional(),
	description: Joi.string().allow("").optional(),
	imgUrl: Joi.string().uri().allow("").optional(),
});
