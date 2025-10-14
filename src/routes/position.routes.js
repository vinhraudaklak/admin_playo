import express from "express";
import { createPosition, getAllPositions, updatePosition, deletePosition } from "../controllers/position.controller.js";
import { authMiddleware, checkRole } from "../middlewares/index.js";
import { validate } from "../middlewares/validate.js";
import { createPositionSchema, updatePositionSchema } from "../validators/index.js";

const router = express.Router();

router.post("/", authMiddleware, checkRole("admin"), validate(createPositionSchema), createPosition);
router.get("/", getAllPositions);
router.put("/:id", authMiddleware, checkRole("admin"), validate(updatePositionSchema), updatePosition);
router.delete("/:id", authMiddleware, checkRole("admin"), deletePosition);

export default router;
