import db from "../database/models/index.js";

const Sport = db.Sport;

export const findAll = async () => Sport.findAll();

export const findById = async (id) => Sport.findByPk(id);

export const create = async (data) => Sport.create(data);

export const update = async (id, data) => {
	const category = await Sport.findByPk(id);
	if (!category) return null;	
	return category.update(data);
};

export const remove = async (id) => {
	const category = await Sport.findByPk(id);
	if (!category) return null;
	await category.destroy();
	return true;
};
