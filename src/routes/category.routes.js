import express from "express";
import {
	getAllCategories,
	getCategoryById,
	createCategory,
	updateCategory,
	deleteCategory,
} from "../controllers/category.controller.js";
import { authMiddleware, checkRole } from "../middlewares/index.js";
// import { validate } from "../middlewares/validate.js";
// import { createCategorySchema, updateCategorySchema } from "../validators/index.js";

const router = express.Router();

router.get("/", getAllCategories);
router.get("/:id", authMiddleware, checkRole("admin"), getCategoryById);
router.post("/", authMiddleware, checkRole("admin"), createCategory);
router.put("/:id", authMiddleware, checkRole("admin"), updateCategory);
router.delete("/:id", authMiddleware, checkRole("admin"), deleteCategory);

export default router;
