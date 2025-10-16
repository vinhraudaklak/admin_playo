import { UserService } from "../services/index.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updated = await UserService.updateUser(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "User not found" });
    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleted = await UserService.deleteUser(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });
    return res.json({ message: "User deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
