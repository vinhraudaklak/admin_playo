import db from "../database/models/index.js";

const Position = db.Position;

export const create = async (data) => Position.create(data);

export const findById = async (id) => Position.findByPk(id);

export const findAll = async () => Position.findAll();

export const update = async (id, data) => {
  const position = await Position.findByPk(id);
  if (!position) return null;
  return position.update(data);
};

export const remove = async (id) => {
  const position = await Position.findByPk(id);
  if (!position) return null;
  await position.destroy();
  return true;
};
