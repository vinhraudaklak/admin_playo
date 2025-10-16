import express from "express";
import { createCategory, getAllCategories, updateCategory, deleteCategory } from "../controllers/category.controller.js";
import { authMiddleware, checkRole } from "../middlewares/index.js";
import { validate } from "../middlewares/validate.js";
import { createCategorySchema, updateCategorySchema } from "../validators/index.js";

const router = express.Router();

router.get("/ports/", getAllCategories);
router.post("/ports/", authMiddleware, checkRole("admin"), validate(createCategorySchema), createCategory);
router.put("/ports/:id", authMiddleware, checkRole("admin"), validate(updateCategorySchema), updateCategory);
router.delete("/ports/:id", authMiddleware, checkRole("admin"), deleteCategory);

export default router;
