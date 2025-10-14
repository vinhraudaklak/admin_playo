import express from "express";
import { createRole, getAllRoles, assignRole, revokeRole } from "../controllers/role.controller.js";
import { authMiddleware, checkRole } from "../middlewares/index.js";
import { validate } from "../middlewares/validate.js";
import { createRoleSchema, assignRoleSchema, revokeRoleSchema } from "../validators/index.js";

const router = express.Router();

router.post("/", authMiddleware, checkRole("admin"), validate(createRoleSchema), createRole);
router.get("/", authMiddleware, checkRole("admin"), getAllRoles);
router.post("/assign", authMiddleware, checkRole("admin"), validate(assignRoleSchema), assignRole);
router.post("/revoke", authMiddleware, checkRole("admin"), validate(revokeRoleSchema), revokeRole);

export default router;
