import db from "../database/models/index.js";

const UserRole = db.UserRole;

export const assignRole = async (userId, roleId) =>
  UserRole.create({ userId, roleId });

export const removeRole = async (userId, roleId) => {
  const userRole = await UserRole.findOne({ where: { userId, roleId } });
  if (!userRole) return null;
  await userRole.destroy();
  return true;
};

export const getRolesByUserId = async (userId) =>
  UserRole.findAll({
    where: { userId },
    include: [{ model: db.Role }],
  });

export const getUsersByRoleId = async (roleId) =>
  UserRole.findAll({
    where: { roleId },
    include: [{ model: db.User }],
  });
