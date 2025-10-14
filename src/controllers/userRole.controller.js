import { UserRoleServiceService } from "../services/index.js";

export const getAllUserRoles = async (req, res) => {
  try {
    const userRoles = await UserRoleRepository.findAll();
    return res.json(userRoles);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getUserRoleById = async (req, res) => {
  try {
    const userRole = await UserRoleRepository.findById(req.params.id);
    if (!userRole) return res.status(404).json({ message: "UserRole not found" });
    return res.json(userRole);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const assignRoleToUser = async (req, res) => {
  try {
    const { userId, roleId } = req.body;

    const user = await UserRepository.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const role = await RoleRepository.findById(roleId);
    if (!role) return res.status(404).json({ message: "Role not found" });

    const userRole = await UserRoleRepository.create({ userId, roleId });
    return res.status(201).json(userRole);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const removeUserRole = async (req, res) => {
  try {
    const deleted = await UserRoleRepository.remove(req.params.id);
    if (!deleted) return res.status(404).json({ message: "UserRole not found" });
    return res.json({ message: "UserRole deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
