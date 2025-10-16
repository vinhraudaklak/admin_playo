import {
	UserRepository,
	RoleRepository,
	UserRoleRepository,
} from "../repositories/index.js";
import bcrypt from "bcrypt";

export const getAllUsers = async () => UserRepository.findAll();

export const getUserById = async (id) => UserRepository.findById(id);

export const updateUser = async (id, data) => {
	const user = await UserRepository.findById(id);
	if (!user) throw new Error("User not found");

	if (data.password) {
		data.password = await bcrypt.hash(data.password, 10);
	}
	return UserRepository.update(id, data);
};

export const deleteUser = async (id) => UserRepository.remove(id);
