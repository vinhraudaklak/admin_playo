import db from "../database/models/index.js";

const Venue = db.Venue;

export const findAll = async (limit, offset, sportId = null, ownerUserId = null) => {
	const where = {};

	if (sportId) {
		where.sportId = sportId; // chỉ lấy sân của môn thể thao cụ thể
	}
	if (ownerUserId) where.ownerUserId = ownerUserId; // 🔹 lọc theo chủ sân

	return Venue.findAndCountAll({
		where,
		include: [
			{ model: db.Sport, as: "sport" },
			{ model: db.User, as: "owner" },
		],
		limit,
		offset,
		order: [["id", "ASC"]],
	});
};

export const findById = async (id) =>
	Venue.findByPk(id, {
		include: [
			{ model: db.Sport, as: "sport" },
			{ model: db.User, as: "owner" },
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
