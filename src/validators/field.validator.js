import Joi from "joi";

export const createFieldSchema = Joi.object({
	sportId: Joi.number().integer().required().messages({
		"any.required": `"sportId" (thể loại sân) là bắt buộc`,
	}),

	ownerUserId: Joi.string().uuid().optional(),

	address: Joi.string().min(5).required(),
	district: Joi.string().optional(),
	latitude: Joi.number().precision(8).optional(),
	longitude: Joi.number().precision(8).optional(),
	mapUrl: Joi.string().uri().optional(),

	name: Joi.string().min(3).required(),
	desShort: Joi.string().optional(),
	description: Joi.string().optional(),

	contactPhone: Joi.string()
		.pattern(/^[0-9+\-\s]{6,20}$/)
		.optional(),
	contactName: Joi.string().optional(),

	pricePerHour: Joi.number().positive().required(),
	stock: Joi.number().integer().min(0).default(0),

	imgUrl: Joi.array().items(Joi.string().uri()).optional(),
	timeActive: Joi.object({
		open: Joi.string()
			.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
			.optional(),
		close: Joi.string()
			.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
			.optional(),
	}).optional(),

	amenities: Joi.array().items(Joi.string()).optional(),

	status: Joi.string().valid("active", "inactive").default("active"),
});

export const updateFieldSchema = Joi.object({
	sportId: Joi.number().integer(),
  ownerUserId: Joi.string().uuid(),

  address: Joi.string().min(5),
  district: Joi.string(),
  latitude: Joi.number().precision(8),
  longitude: Joi.number().precision(8),
  mapUrl: Joi.string().uri(),

  name: Joi.string().min(3),
  desShort: Joi.string(),
  description: Joi.string(),

  contactPhone: Joi.string().pattern(/^[0-9+\-\s]{6,20}$/),
  contactName: Joi.string(),

  pricePerHour: Joi.number().positive(),
  stock: Joi.number().integer().min(0),

  imgUrl: Joi.array().items(Joi.string().uri()),
  timeActive: Joi.object({
    open: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/),
    close: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/),
  }),

  amenities: Joi.array().items(Joi.string()),

  status: Joi.string().valid("active", "inactive"),
});
