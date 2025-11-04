import { CategoryService } from "../services/index.js";

export const getAllCategories = async (req, res) => {
	try {
		const { page = 1, limit = 5 } = req.query;
		const result = await CategoryService.getAllCategories(page, limit);
		return res.json(result);
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

export const getCategoryById = async (req, res) => {
	try {
		const category = await CategoryService.getCategoryById(req.params.id);
		if (!category)
			return res.status(404).json({ message: "Category not found" });
		return res.json(category);
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

export const createCategory = async (req, res) => {
	try {
		const category = await CategoryService.createCategory(req.body);
		return res.status(201).json(category);
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

export const updateCategory = async (req, res) => {
	try {
		const updated = await CategoryService.updateCategory(
			req.params.id,
			req.body
		);
		if (!updated)
			return res.status(404).json({ message: "Category not found" });
		return res.json(updated);
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

export const deleteCategory = async (req, res) => {
	try {
		const deleted = await CategoryService.deleteCategory(req.params.id);
		if (!deleted)
			return res.status(404).json({ message: "Category not found" });
		return res.json({ message: "Category deleted successfully" });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};
