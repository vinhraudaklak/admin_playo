import { AuthService } from "../services/index.js";

export const register = async (req, res) => {
  try {
    const user = await AuthService.register(req.body);
    return res.status(201).json(user);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const data = await AuthService.login(req.body);
    return res.json(data);
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
    const data = await AuthService.logout(req.user.id);
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
