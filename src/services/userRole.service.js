import { UserRoleRepository, UserRepository, RoleRepository } from "../repositories/index.js";

export const getAllUserRoles = async () => UserRoleRepository.findAll();

export const getUserRoleById = async (id) => UserRoleRepository.findById(id);

export const assignRoleToUser = async (userId, roleId) => {
  const user = await UserRepository.findById(userId);
  if (!user) throw new Error("User not found");

  const role = await RoleRepository.findById(roleId);
  if (!role) throw new Error("Role not found");

  return UserRoleRepository.create({ userId, roleId });
};

export const removeUserRole = async (id) => UserRoleRepository.remove(id);
