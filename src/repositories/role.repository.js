import db from "../database/models/index.js";

const Role = db.Role;

export const create = async (data) => Role.create(data);

export const findById = async (id) => Role.findByPk(id);

export const findByName = async (name) => Role.findOne({ where: { name } });

export const findAll = async () => Role.findAll();

export const update = async (id, data) => {
  const role = await Role.findByPk(id);
  if (!role) return null;
  return role.update(data);
};

export const remove = async (id) => {
  const role = await Role.findByPk(id);
  if (!role) return null;
  await role.destroy();
  return true;
};
