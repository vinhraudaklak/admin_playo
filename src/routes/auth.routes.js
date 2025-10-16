import express from "express";
// handle controllers.
import { register, login, refreshToken, logout } from "../controllers/auth.controller.js";
//  handle validate form và check rules validate data request.
import { validate } from "../middlewares/validate.js";
import { registerSchema, loginSchema } from "../validators/index.js";

const router = express.Router();

router.post("/login", validate(loginSchema), login);
router.post("/register", validate(registerSchema), register);
router.post("/refresh", refreshToken);
router.post("/logout", logout);

export default router;
