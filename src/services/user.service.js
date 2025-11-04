import { UserRepository } from "../repositories/index.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (page = 1, limit = 5, search = "") => {
	const offset = (page - 1) * limit;
	const { count, rows } = await UserRepository.findAndCountAll(
		limit,
		offset,
		search
	);
	const pagination = {
		totalUsers: count,
		totalPages: Math.ceil(count / limit),
		currentPage: page,
	};
	return { users: rows, pagination };
};

export const getUserById = async (id) => {
	return await UserRepository.findById(id);
};

export const updateUser = async (id, data) => {
	const user = await UserRepository.findById(id);
	if (!user) throw new Error("User not found");

	const updateData = { ...data };

	// Nếu có thay đổi password thì hash lại
	if (updateData.password) {
		updateData.password = await bcrypt.hash(updateData.password, 10);
	}

	const updatedUser = await UserRepository.update(id, updateData);
	return updatedUser;
};

export const createUser = async (data) => {
	const { name, email, password, role, phone, address, dateOfBirth } = data;

	const hashedPassword = await bcrypt.hash(password, 10);

	const newUser = await UserRepository.create({
		name,
		email,
		password: hashedPassword,
		role: role || "user",
		phone,
		address,
		dateOfBirth,
	});

	return newUser;
};

export const deleteUser = async (id) => {
	return await UserRepository.remove(id);
};
