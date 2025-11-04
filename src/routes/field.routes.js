import express from "express";
import {
	createField,
	getAllFields,
	updateField,
	deleteField,
	getFieldById,
	updateFieldStatus,
} from "../controllers/field.controller.js";
import { authMiddleware, checkRole } from "../middlewares/index.js";
import { validate } from "../middlewares/validate.js";
import { createFieldSchema, updateFieldSchema } from "../validators/index.js";

const router = express.Router();

router.get("/", getAllFields);
router.get("/:id", getFieldById);
router.put(
	"/:id",
	authMiddleware,
	checkRole("admin", "owner"),
	// validate(updateFieldSchema),
	updateField
);
router.post(
	"/",
	authMiddleware,
	checkRole("admin", "owner"),
	validate(createFieldSchema),
	createField
);
router.put(
	"/:id/status",
	authMiddleware,
	checkRole("admin", "owner"),
	updateFieldStatus
);
router.delete("/:id", authMiddleware, checkRole("admin", "owner"), deleteField);

export default router;
