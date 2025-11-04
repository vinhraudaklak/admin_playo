import db from "../database/models/index.js";
const { VenueSlot, Venue, Sport, SlotUser } = db;

export const findAll = async () => {
	return VenueSlot.findAll({
		include: [
			{ model: Venue, as: "venue" },
			{ model: Sport, as: "sport" },
			{ model: SlotUser, as: "slotUsers" },
		],
		order: [["date", "ASC"], ["startTime", "ASC"]],
	});
};

export const findById = async (id) => {
	return VenueSlot.findByPk(id, {
		include: [
			{ model: Venue, as: "venue" },
			{ model: Sport, as: "sport" },
			{ model: SlotUser, as: "slotUsers" },
		],
	});
};

export const create = async (data) => {
	return VenueSlot.create(data);
};

export const update = async (id, data) => {
  const slot = await VenueSlot.findByPk(id);
  if (!slot) return null;
  await slot.update(data);
  return slot.toJSON(); // ⚡ trả JSON thật, không phải Sequelize instance
};

export const remove = async (id) => {
	const slot = await VenueSlot.findByPk(id);
	if (!slot) return null;
	await slot.destroy();
	return true;
};