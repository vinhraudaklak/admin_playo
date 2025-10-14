import express from "express";
import { register, login, refreshToken, logout } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.js";
import { registerSchema, loginSchema } from "../validators/index.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/refresh", refreshToken);
router.post("/logout", logout);

export default router;
