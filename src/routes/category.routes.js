import express from "express";
import { createCategory, getAllCategories, updateCategory, deleteCategory } from "../controllers/category.controller.js";
import { authMiddleware, checkRole } from "../middlewares/index.js";
import { validate } from "../middlewares/validate.js";
import { createCategorySchema, updateCategorySchema } from "../validators/index.js";

const router = express.Router();

router.post("/", authMiddleware, checkRole("admin"), validate(createCategorySchema), createCategory);
router.get("/", getAllCategories);
router.put("/:id", authMiddleware, checkRole("admin"), validate(updateCategorySchema), updateCategory);
router.delete("/:id", authMiddleware, checkRole("admin"), deleteCategory);

export default router;
