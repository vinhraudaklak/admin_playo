import db from "../database/models/index.js";

const Category = db.Category;

export const create = async (data) => Category.create(data);

export const findById = async (id) => Category.findByPk(id);

export const findAll = async () => Category.findAll();

export const update = async (id, data) => {
	const category = await Category.findByPk(id);
	if (!category) return null;
	return category.update(data);
};

export const remove = async (id) => {
	const category = await Category.findByPk(id);
	if (!category) return null;
	await category.destroy();
	return true;
};
