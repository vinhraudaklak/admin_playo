import {
	UserRepository,
	RoleRepository,
	UserRoleRepository,
} from "../repositories/index.js";
import bcrypt from "bcrypt";

export const getAllUsers = async () => UserRepository.findAll();

export const getUserById = async (id) => UserRepository.findById(id);

export const createUser = async (data) => {
	const hashedPassword = await bcrypt.hash(data.password, 10);
	const user = await UserRepository.create({
		...data,
		password: hashedPassword,
	});

	const defaultRole = await RoleRepository.findByName("user");
	if (defaultRole) {
		await UserRoleRepository.create({
			userId: user.id,
			roleId: defaultRole.id,
		});
	}

	return user;
};

export const updateUser = async (id, data) => {
	if (data.password) {
		data.password = await bcrypt.hash(data.password, 10);
	}
	return UserRepository.update(id, data);
};

export const deleteUser = async (id) => UserRepository.remove(id);
