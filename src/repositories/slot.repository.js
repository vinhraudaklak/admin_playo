import db from "../database/models/index.js";

const Slot = db.Slot;

export const create = async (data) => Slot.create(data);

export const findById = async (id) => Slot.findByPk(id, { include: [db.Field] });

export const findAll = async () => Slot.findAll({ include: [db.Field] });

export const update = async (id, data) => {
  const slot = await Slot.findByPk(id);
  if (!slot) return null;
  return slot.update(data);
};

export const remove = async (id) => {
  const slot = await Slot.findByPk(id);
  if (!slot) return null;
  await slot.destroy();
  return true;
};
