import Joi from "joi";

/**
 * Middleware validate request body với Joi schema
 * @param {Joi.Schema} schema - schema Joi
 */
export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        error: "Validation error",
        details: error.details.map((d) => d.message),
      });
    }

    next();
  };
};
