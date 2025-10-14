import { CategoryRepository } from "../repositories/index.js";

export const getAllCategories = async () => CategoryRepository.findAll();

export const getCategoryById = async (id) => CategoryRepository.findById(id);

export const createCategory = async (data) => CategoryRepository.create(data);

export const updateCategory = async (id, data) =>
	CategoryRepository.update(id, data);

export const deleteCategory = async (id) => CategoryRepository.remove(id);
