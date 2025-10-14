import Joi from "joi";

export const createRoleSchema = Joi.object({
  name: Joi.string().valid("admin", "manager", "player").required(),
});

export const assignRoleSchema = Joi.object({
  userId: Joi.number().integer().required(),
  roleId: Joi.number().integer().required(),
});

export const revokeRoleSchema = Joi.object({
  userId: Joi.number().integer().required(),
  roleId: Joi.number().integer().required(),
});
