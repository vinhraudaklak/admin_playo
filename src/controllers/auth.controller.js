import { AuthService } from "../services/index.js";

export const login = async (req, res) => {
	try {
		const data = await AuthService.login(req.body);
		return res.json(data);
	} catch (err) {
		return res.status(400).json({ message: err.message });
	}
};

export const register = async (req, res) => {
	try {
		const user = await AuthService.register(req.body);
		return res.status(201).json(user);
	} catch (err) {
		return res.status(400).json({ message: err.message });
	}
};

export const refreshToken = async (req, res) => {
	try {
		const { token } = req.body;
		const data = await AuthService.refreshToken(token);
		return res.json(data);
	} catch (err) {
		return res.status(403).json({ message: err.message });
	}
};

export const logout = async (req, res) => {
	try {
		const { token } = req.body; // refresh token gửi từ client
		await AuthService.logout(token);
		return res.json({ message: "Logged out successfully" });
	} catch (err) {
		return res.status(400).json({ message: err.message });
	}
};
