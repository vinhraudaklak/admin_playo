import { FieldRepository } from "../repositories/index.js";
import db from "../database/models/index.js"; // để lấy Sport, User

// Lấy tất cả sân (Venue)
export const getAllFields = async (limit, offset,  sportId = null, ownerUserId = null) => {
	return await FieldRepository.findAll(limit, offset, sportId, ownerUserId); // FieldRepository đã include sport + owner
};

// Lấy 1 sân theo id
export const getFieldById = async (id) => {
	const field = await FieldRepository.findById(id);
	if (!field) throw new Error("Venue not found");
	return field;
};

// Tạo mới sân
export const createField = async (data) => {
	// ✅ Kiểm tra sportId có tồn tại
	const sport = await db.Sport.findByPk(data.sportId);
	if (!sport) throw new Error("Sport not found");

	// ✅ Kiểm tra ownerUserId có tồn tại (nếu có)
	if (data.ownerUserId) {
		const owner = await db.User.findByPk(data.ownerUserId);
		if (!owner) throw new Error("Owner user not found");
	}

	// ✅ Tạo sân
	return await FieldRepository.create(data);
};

// Cập nhật sân
export const updateField = async (id, data) => {
	const updated = await FieldRepository.update(id, data);
	if (!updated) throw new Error("Venue not found");
	return updated;
};

// Xóa sân
export const deleteField = async (id) => {
	const deleted = await FieldRepository.remove(id);
	if (!deleted) throw new Error("Venue not found");
	return deleted;
};

export const updateFieldStatus = async (id, status) => {
	const updated = await FieldRepository.update(id, { status });
	if (!updated) throw new Error("Venue not found");
	return updated;
};