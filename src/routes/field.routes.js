import express from "express";
import { createField, getAllFields, updateField, deleteField, getFieldById } from "../controllers/field.controller.js";
import { authMiddleware, checkRole } from "../middlewares/index.js";
import { validate } from "../middlewares/validate.js";
import { createFieldSchema, updateFieldSchema } from "../validators/index.js";

const router = express.Router();

router.get("/venues", getAllFields);
router.get("/venue/:id", getFieldById);
router.put("/venue/:id", authMiddleware, checkRole("admin"), validate(updateFieldSchema), updateField);
router.post("/venue", authMiddleware, checkRole("admin"), validate(createFieldSchema), createField);
router.delete("/venue/:id", authMiddleware, checkRole("admin"), deleteField);

export default router;
