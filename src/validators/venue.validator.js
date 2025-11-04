import Joi from "joi";

export const createVenueSchema = Joi.object({
	sportId: Joi.number().integer().required(),
	ownerUserId: Joi.string().uuid().required(),
	address: Joi.string().required(),
	name: Joi.string().required(),
	pricePerHour: Joi.number().precision(2).required(),

	// Các field tùy chọn
	description: Joi.string().allow(null, ""),
	desShort: Joi.string().allow(null, ""),
	contactPhone: Joi.string().allow(null, ""),
	contactName: Joi.string().allow(null, ""),
	latitude: Joi.number().precision(8).allow(null),
	longitude: Joi.number().precision(8).allow(null),
	mapUrl: Joi.string().uri().allow(null, ""),
	imgUrl: Joi.array().items(Joi.string().uri()).allow(null),
	timeActive: Joi.object().allow(null),
	amenities: Joi.array().items(Joi.string()).allow(null),
	status: Joi.string().valid("active", "inactive").default("active"),
});

export const updateVenueSchema = Joi.object({
	sportId: Joi.number().integer(),
	ownerUserId: Joi.string().uuid(),
	address: Joi.string(),
	name: Joi.string(),
	pricePerHour: Joi.number().precision(2),

	description: Joi.string().allow(null, ""),
	desShort: Joi.string().allow(null, ""),
	contactPhone: Joi.string().allow(null, ""),
	contactName: Joi.string().allow(null, ""),
	latitude: Joi.number().precision(8).allow(null),
	longitude: Joi.number().precision(8).allow(null),
	mapUrl: Joi.string().uri().allow(null, ""),
	imgUrl: Joi.array().items(Joi.string().uri()).allow(null),
	timeActive: Joi.object().allow(null),
	amenities: Joi.array().items(Joi.string()).allow(null),
	status: Joi.string().valid("active", "inactive"),
});
