import db from "../database/models/index.js";

const Field = db.Field;

export const create = async (data) => Field.create(data);

export const findById = async (id) => Field.findByPk(id, { include: [db.Category, db.Position] });

export const findAll = async () => Field.findAll({ include: [db.Category, db.Position] });

export const update = async (id, data) => {
  const field = await Field.findByPk(id);
  if (!field) return null;
  return field.update(data);
};

export const remove = async (id) => {
  const field = await Field.findByPk(id);
  if (!field) return null;
  await field.destroy();
  return true;
};
