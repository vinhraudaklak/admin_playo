import { QueryTypes } from "sequelize";
import db from "../database/models/index.js";

const User = db.User;

// Create
export const create = async (data) => User.create(data);

// Find by ID
export const findById = async (id) => User.findByPk(id);

// Find by Email
export const findByEmail = async (email) => User.findOne({ where: { email } });

// Find all
export const findAll = async () => User.findAll();

// Update with ORM
export const update = async (id, data) => {
	const user = await User.findByPk(id);
	if (!user) return null;
	return user.update(data);
};

// Update with raw query
export const updateRaw = async (id, userData) => {
	try {
		await db.sequelize.query(
			`UPDATE Users
       SET name = :name, email = :email, passwordHash = :passwordHash
       WHERE id = :id`,
			{
				replacements: {
					id,
					name: userData.name,
					email: userData.email,
					passwordHash: userData.passwordHash || "",
				},
				type: QueryTypes.UPDATE,
			}
		);

		return { id, ...userData };
	} catch (error) {
		throw new Error("Error updating user: " + error.message);
	}
};

// Delete
export const remove = async (id) => {
	const user = await User.findByPk(id);
	if (!user) return null;
	await user.destroy();
	return true;
};

// Get user by email (raw query, optional password)
export const getUserByEmail = async (email, withPassword = false) => {
	try {
		if (withPassword) {
			return await User.scope("withPassword").findOne({
				where: { email },
			});
		}

		const [user] = await db.sequelize.query(
			"SELECT id, name, email FROM Users WHERE email = :email",
			{
				replacements: { email },
				type: QueryTypes.SELECT,
			}
		);

		return user;
	} catch (error) {
		throw new Error("Error fetching user by email: " + error.message);
	}
};

// Refresh token helper
export const updateOrCreateRefreshToken = async (user, token) => {
	try {
		const expiresAt = getExpiresAtFromToken(token);

		if (user.RefreshToken) {
			await user.RefreshToken.update({
				userId: user.id,
				token,
				expiresAt,
			});
		} else {
			await user.createRefreshToken({ token, expiresAt });
		}
	} catch (error) {
		throw new Error("Error updating refresh token: " + error.message);
	}
};
