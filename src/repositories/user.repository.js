import { QueryTypes } from "sequelize";
import db from "../database/models/index.js";
import { Op } from "sequelize";

const User = db.User;

// Helper: loại bỏ password trước khi trả về
const sanitizeUser = (user) => {
	if (!user) return null;
	const plain = user.get ? user.get({ plain: true }) : user;
	delete plain.password;
	delete plain.passwordHash;
	return plain;
};

// ================= CRUD =================

export const create = async (data) => {
	const user = await User.create(data);
	return sanitizeUser(user);
};

// Find user by ID
export const findById = async (id) => {
	const user = await User.findByPk(id, {
		attributes: ["id", "name", "email", "role", "phone"],
	});
	return sanitizeUser(user);
};

// Find user by Email
export const findByEmail = async (email) => {
	const user = await User.findOne({ where: { email } });
	return sanitizeUser(user);
};

export const findAndCountAll = async (limit, offset, search = "") => {
	const whereClause = search
		? {
				[Op.or]: [
					{ name: { [Op.like]: `%${search}%` } },
					{ email: { [Op.like]: `%${search}%` } },
				],
		  }
		: {};
	const result = await User.findAndCountAll({
		where: whereClause,
		limit,
		offset,
		order: [["createdAt", "DESC"]],
	});

	return {
		count: result.count,
		rows: result.rows.map(sanitizeUser),
	};
};

// Update user.
export const update = async (id, data) => {
	const user = await User.findByPk(id);
	if (!user) return null;
	const updated = await user.update(data);
	return sanitizeUser(updated);
};

// Delete user
export const remove = async (id) => {
	const user = await User.findByPk(id);
	if (!user) return null;
	await user.destroy();
	return true;
};

// Find one user with custom condition (giống findOne của Sequelize)
export const findOne = async (condition) => {
  const user = await User.findOne(condition);
  return user;
};

// ================= RAW QUERY & EXTRA HELPERS =================

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

		return sanitizeUser({ id, ...userData });
	} catch (error) {
		throw new Error("Error updating user: " + error.message);
	}
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
