import Joi from "joi";

/* ==========================
   📘 CREATE BOOKING
========================== */
export const createBookingSchema = Joi.object({
	venueId: Joi.number().integer().required().messages({
		"any.required": "venueId is required",
		"number.base": "venueId must be a number",
	}),

	// ❌ FE không cần gửi userId — server tự gắn từ req.user.id
	userId: Joi.forbidden(),

	slotId: Joi.number().integer().allow(null),
	sportId: Joi.number().integer().allow(null),

	bookingDate: Joi.date().required().messages({
		"any.required": "bookingDate is required",
		"date.base": "bookingDate must be a valid date (YYYY-MM-DD)",
	}),

	startTime: Joi.string()
		.pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
		.required()
		.messages({
			"any.required": "startTime is required",
			"string.pattern.base":
				"startTime must be in HH:mm format (e.g. 09:30)",
		}),

	// endTime là optional vì backend tự tính khi dùng duration
	endTime: Joi.string()
		.pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
		.allow(null),

	// optional, default pending
	status: Joi.string()
		.valid("pending", "confirmed", "cancelled")
		.default("pending"),

	// giờ đặt sân có tính theo giờ hay không
	hourly: Joi.number().integer().min(1).default(1).messages({
		"number.base": "hourly must be a number (e.g. 1, 2, 3)",
	}),

	ticketPrice: Joi.number().precision(2).required().messages({
		"any.required": "ticketPrice is required",
		"number.base": "ticketPrice must be a valid number",
	}),

	totalPrice: Joi.number().precision(2).required().messages({
		"any.required": "totalPrice is required",
		"number.base": "totalPrice must be a valid number",
	}),

	paymentMethod: Joi.string().valid("COD", "BANK").optional(),
});
export const updateBookingSchema = Joi.object({
	venueId: Joi.number().integer(),
	slotId: Joi.number().integer().allow(null),
	sportId: Joi.number().integer().allow(null),
	bookingDate: Joi.date(),
	startTime: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/),
	endTime: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/),
	status: Joi.string().valid("pending", "confirmed", "cancelled"),
	hourly: Joi.boolean(),
	ticketPrice: Joi.number().precision(2),
	totalPrice: Joi.number().precision(2),
}).min(1);
