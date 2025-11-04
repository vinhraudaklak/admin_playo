import { CategoryRepository } from "../repositories/index.js";

export const getAllCategories = async (page = 1, limit = 5) => {
	const offset = (page - 1) * limit;

	const { rows, count } = await CategoryRepository.findAndCountAll({
		limit: Number(limit),
		offset,
		order: [["createdAt", "DESC"]],
	});

	return {
		data: rows,
		pagination: {
			total: count,
			page: Number(page),
			totalPages: Math.ceil(count / limit),
		},
	};
};

export const getCategoryById = async (id) => CategoryRepository.findById(id);

export const createCategory = async (data) => CategoryRepository.create(data);

export const updateCategory = async (id, data) =>
	CategoryRepository.update(id, data);

export const deleteCategory = async (id) => CategoryRepository.remove(id);
