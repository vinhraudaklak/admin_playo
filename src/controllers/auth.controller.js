import { AuthService } from "../services/index.js";

export const login = async (req, res) => {
	try {
		const result = await AuthService.login(req.body);
		const { user, accessToken, refreshToken } = result;

		res.status(200).json({
			success: true,
			message: result.message,
			user,
			accessToken,
			refreshToken,
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error.message || "Login failed",
		});
	}
};

export const register = async (req, res) => {
	try {
		const result = await AuthService.register(req.body);
		res.status(201).json({
			success: true,
			message: result.message,
			data: result.data,
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error.message || "Register failed",
		});
	}
};

export const refreshToken = async (req, res) => {
	try {
		const result = await AuthService.refreshToken(req.body.refreshToken);
		res.status(200).json({
			success: true,
			message: result.message,
			data: result.data,
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error.message || "Refresh token failed",
		});
	}
};

export const logout = async (req, res) => {
	try {
		await AuthService.logout(req.body.refreshToken);
		res.status(200).json({
			success: true,
			message: "Logout successful",
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error.message || "Logout failed",
		});
	}
};

// 🔹 Quên mật khẩu
export const forgotPassword = async (req, res) => {
	try {
		const result = await AuthService.forgotPassword(req.body.email);
		res.status(200).json({
			success: true,
			message: result.message,
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error.message || "Quên mật khẩu thất bại",
		});
	}
};

// 🔹 Đặt lại mật khẩu
export const resetPassword = async (req, res) => {
	try {
		const { token, password } = req.body;
		const result = await AuthService.resetPassword(token, password);
		res.status(200).json({
			success: true,
			message: result.message,
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error.message || "Đặt lại mật khẩu thất bại",
		});
	}
};