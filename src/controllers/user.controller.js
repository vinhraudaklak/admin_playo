import { UserService } from "../services/index.js";

export const getAllUsers = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 5;
		const search = req.query.search ? req.query.search.trim() : "";

		const { users, pagination } = await UserService.getAllUsers(
			page,
			limit,
			search
		);

		return res.status(200).json({
			success: true,
			data: users,
			pagination,
		});
	} catch (err) {
		console.error("getAllUsers error:", err);
		return res.status(500).json({
			success: false,
			message: err.message || "Lỗi khi lấy danh sách người dùng",
		});
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

export const getCurrentUser = async (req, res) => {
	try {
		const userId = req.user?.id;
		if (!userId)
			return res.status(400).json({ message: "Token không hợp lệ" });

		const user = await UserService.getUserById(userId);
		if (!user) return res.status(404).json({ message: "User not found" });

		return res.json({
			success: true,
			user,
		});
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

export const updateUser = async (req, res) => {
	try {
		const userIdFromToken = req.user?.id;
		const userIdFromParams = req.params.id;

		// ✅ Nếu không có id hoặc token
		if (!userIdFromToken) {
			return res
				.status(401)
				.json({ message: "Không tìm thấy user hoặc token!" });
		}

		// ✅ Chỉ user tự cập nhật chính mình hoặc admin mới được sửa
		if (
			userIdFromToken !== userIdFromParams &&
			req.user?.role !== "admin"
		) {
			return res
				.status(403)
				.json({ message: "Bạn không có quyền cập nhật user này!" });
		}

		const updated = await UserService.updateUser(
			userIdFromParams,
			req.body
		);

		if (!updated) {
			return res.status(404).json({ message: "User not found" });
		}

		return res.json({
			success: true,
			message: "Cập nhật thông tin thành công",
			user: updated,
		});
	} catch (err) {
		console.error("Update user error:", err);
		return res.status(500).json({ message: err.message });
	}
};

export const createUser = async (req, res) => {
	try {
		const { name, email, password, role, phone, address, dateOfBirth } =
			req.body;

		if (!name || !email || !password) {
			return res
				.status(400)
				.json({ message: "Thiếu thông tin bắt buộc" });
		}

		const user = await UserService.createUser({
			name,
			email,
			password,
			role,
			phone,
			address,
			dateOfBirth,
		});

		return res.status(201).json({
			success: true,
			message: "Tạo người dùng thành công",
			user,
		});
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

export const deleteUser = async (req, res) => {
	try {
		const deleted = await UserService.deleteUser(req.params.id);
		if (!deleted)
			return res.status(404).json({ message: "User not found" });
		return res.json({ message: "User deleted successfully" });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};
