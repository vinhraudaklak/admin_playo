import express from "express";
import crypto from "crypto";
import { Op } from "sequelize";
import db from "../database/models/index.js";
import sendEmail from "../utils/sendEmail.js";
import { register, login, refreshToken, logout, forgotPassword, resetPassword } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.js";
import { registerSchema, loginSchema } from "../validators/index.js";

const router = express.Router();
const User = db.User;

router.post("/login", validate(loginSchema), login);
router.post("/register", validate(registerSchema), register);
router.post("/refresh", refreshToken);
router.post("/logout", logout);

// 🔹 Forgot / Reset password
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
