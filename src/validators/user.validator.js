import Joi from "joi";

export const registerSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
	name: Joi.string().min(2).required(),
	phone: Joi.string().optional(),
});

export const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});
