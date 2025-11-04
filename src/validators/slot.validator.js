import Joi from "joi";

export const createSlotSchema = Joi.object({
	venueId: Joi.number().integer().required(),
	sportId: Joi.number().integer().allow(null),
	level: Joi.string().allow(null, ""),
	listUsers: Joi.array().items(Joi.object()).allow(null),
	date: Joi.date().required(), // YYYY-MM-DD
	startTime: Joi.string()
		.pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
		.required(), // HH:mm format
	endTime: Joi.string()
		.pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
		.required()
		.custom((value, helpers) => {
			const [h1, m1] = helpers.state.ancestors[0].startTime
				.split(":")
				.map(Number);
			const [h2, m2] = value.split(":").map(Number);
			if (h2 < h1 || (h2 === h1 && m2 <= m1)) {
				return helpers.error("any.invalid", {
					message: "endTime must be after startTime",
				});
			}
			return value;
		}),
	isAvailable: Joi.boolean().default(true),
});

export const updateSlotSchema = Joi.object({
	sportId: Joi.number().integer().allow(null),
	level: Joi.string().allow(null, ""),
	listUsers: Joi.array().items(Joi.object()).allow(null),
	date: Joi.date(),
	startTime: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/),
	endTime: Joi.string()
		.pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
		.custom((value, helpers) => {
			const body = helpers.state.ancestors[0];
			if (body.startTime) {
				const [h1, m1] = body.startTime.split(":").map(Number);
				const [h2, m2] = value.split(":").map(Number);
				if (h2 < h1 || (h2 === h1 && m2 <= m1)) {
					return helpers.error("any.invalid", {
						message: "endTime must be after startTime",
					});
				}
			}
			return value;
		}),
	isAvailable: Joi.boolean(),
});
