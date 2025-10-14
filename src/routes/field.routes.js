import express from "express";
import { createField, getAllFields, updateField, deleteField } from "../controllers/field.controller.js";
import { authMiddleware, checkRole } from "../middlewares/index.js";
import { validate } from "../middlewares/validate.js";
import { createFieldSchema, updateFieldSchema } from "../validators/index.js";

const router = express.Router();

router.post("/", authMiddleware, checkRole("admin"), validate(createFieldSchema), createField);
router.get("/", getAllFields);
router.put("/:id", authMiddleware, checkRole("admin"), validate(updateFieldSchema), updateField);
router.delete("/:id", authMiddleware, checkRole("admin"), deleteField);

export default router;
