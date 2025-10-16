import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import AppConfig from "../config/index.js";
import {
	UserRepository,
	AuthRepository,
	RefreshTokenRepository,
} from "../repositories/index.js";

export const login = async ({ email, password }) => {
	const user = await AuthRepository.findByEmail(email);
	if (!user) throw new Error("User not found");

	const valid = await bcrypt.compare(password, user.password);
	if (!valid) throw new Error("Invalid credentials");

	const accessToken = jwt.sign({ id: user.id }, AppConfig.jwt.secret, {
		expiresIn: AppConfig.jwt.expiresIn,
	});
	const refreshToken = jwt.sign(
		{ id: user.id },
		AppConfig.jwt.refreshSecret,
		{
			expiresIn: AppConfig.jwt.refreshExpiresIn,
		}
	);

	await RefreshTokenRepository.create({
		token: refreshToken,
		userId: user.id,
		expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // ví dụ 7 ngày sau
	});

	return { accessToken, refreshToken };
};

export const register = async ({ email, password, name }) => {
	const existingUser = await AuthRepository.findByEmail(email);
	if (existingUser) throw new Error("Email already in use");

	const hashedPassword = await bcrypt.hash(password, 10);
	const user = await UserRepository.create({
		email,
		password: hashedPassword,
		name,
	});
	return user;
};

export const refreshToken = async (token) => {
	if (!token) throw new Error("Refresh token required");

	const savedToken = await RefreshTokenRepository.findByToken(token);
	if (!savedToken) throw new Error("Invalid refresh token");

	const decoded = jwt.verify(token, AppConfig.jwt.refreshSecret);
	const newAccessToken = jwt.sign({ id: decoded.id }, AppConfig.jwt.secret, {
		expiresIn: AppConfig.jwt.expiresIn,
	});

	return { accessToken: newAccessToken };
};

export const logout = async (token) => {
	if (!token) throw new Error("Refresh token required");

	const savedToken = await RefreshTokenRepository.findByToken(token);
	if (!savedToken) throw new Error("Invalid refresh token");

	await savedToken.destroy(); // ✅ Xóa refresh token khỏi DB
	return true;
};
