import db from "../database/models/index.js";

const Venue = db.Venue;

export const findAll = async () =>
	Venue.findAll({
		include: [
			{ model: db.Sport, as: "sport" }, // dùng đúng alias đã định nghĩa trong model
			{ model: db.User, as: "owner" }, // alias "owner" trong model Venue
		],
	});

export const findById = async (id) =>
	Venue.findByPk(id, {
		include: [
			{ model: db.Sport, as: "sport" }, // dùng đúng alias đã định nghĩa trong model
			{ model: db.User, as: "owner" }, // alias "owner" trong model Venue
		],
	});

export const update = async (id, data) => {
	const field = await Venue.findByPk(id);
	if (!field) return null;
	return field.update(data);
};

export const create = async (data) => Venue.create(data);

export const remove = async (id) => {
	const field = await Venue.findByPk(id);
	if (!field) return null;
	await field.destroy();
	return true;
};
