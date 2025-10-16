import {
	FieldRepository,
	PositionRepository,
	CategoryRepository,
} from "../repositories/index.js";

export const getAllFields = async () => FieldRepository.findAll();

export const getFieldById = async (id) => FieldRepository.findById(id);

export const updateField = async (id, data) => FieldRepository.update(id, data);

export const createField = async (data) => {
	// Kiểm tra sport_id (thể loại sân)
	const sport = await FieldRepository.findById(data.sportId);
	if (!sport) throw new Error("Sport not found");

	// Kiểm tra owner_user_id (chủ sân)
	if (data.owner_user_id) {
		const owner = await FieldRepository.findById(data.owner_user_id);
		if (!owner) throw new Error("Owner user not found");
	}

	// Tạo sân
	return FieldRepository.create(data);
};

export const deleteField = async (id) => FieldRepository.remove(id);
