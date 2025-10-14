import { RoleService } from "../services/index.js";

export const getAllRoles = async (req, res) => {
  try {
    const roles = await RoleRepository.findAll();
    return res.json(roles);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const createRole = async (req, res) => {
  try {
    const role = await RoleRepository.create(req.body);
    return res.status(201).json(role);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const assignRole = async (req, res) => {
  try {
    const { userId, roleId } = req.body;
    const user = await UserRepository.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.addRole(roleId);
    return res.json({ message: "Role assigned" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const revokeRole = async (req, res) => {
  try {
    const { userId, roleId } = req.body;
    const user = await UserRepository.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.removeRole(roleId);
    return res.json({ message: "Role revoked" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
