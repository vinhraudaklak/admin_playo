import db from "../database/models/index.js";
const Sport = db.Sport;

export const findAndCountAll = async (options) => Sport.findAndCountAll(options);

export const findById = async (id) => Sport.findByPk(id);

export const create = async (data) => Sport.create(data);

export const update = async (id, data) => {
  const sport = await Sport.findByPk(id);
  if (!sport) return null;
  return sport.update(data);
};

export const remove = async (id) => {
  const sport = await Sport.findByPk(id);
  if (!sport) return null;
  await sport.destroy();
  return true;
};
