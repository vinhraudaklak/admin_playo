import { FieldService } from "../services/index.js";

export const getAllFields = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1; // trang hiện tại
		const limit = parseInt(req.query.limit) || 5; // số item/trang
		const offset = (page - 1) * limit;
		const sportId = req.query.sportId ? parseInt(req.query.sportId) : null;
		const ownerUserId = req.query.ownerUserId || null; // 🔹 thêm dòng này
		const { count, rows } = await FieldService.getAllFields(limit, offset,sportId,ownerUserId);
		return res.json({
			success: true,
			data: rows,
			total: count,
			currentPage: page,
			totalPages: Math.ceil(count / limit),
		});
	} catch (err) {
		return res.status(500).json({	success: false,	 message: err.message });
	}
};

export const getFieldById = async (req, res) => {
	try {
		const field = await FieldService.getFieldById(req.params.id);
		if (!field) return res.status(404).json({ message: "Field not found" });
		return res.json(field);
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

export const updateField = async (req, res) => {
	try {
		const updated = await FieldService.updateField(req.params.id, req.body);
		if (!updated)
			return res.status(404).json({ message: "Field not found" });
		return res.json(updated);
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

export const createField = async (req, res) => {
  try {
    const data = req.body;

    // ✅ nếu là owner thì tự động gán id của họ
    if (req.user.role === "owner") {
      data.ownerUserId = req.user.id;
    }

    const field = await FieldService.createField(data);
    return res.status(201).json(field);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


export const deleteField = async (req, res) => {
	try {
		const deleted = await FieldService.deleteField(req.params.id);
		if (!deleted)
			return res.status(404).json({ message: "Field not found" });
		return res.json({ message: "Field deleted successfully" });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

// ⚡ Cập nhật trạng thái sân (active / inactive)
export const updateFieldStatus = async (req, res) => {
	try {
		const { id } = req.params;
		const { status } = req.body;

		if (!["active", "inactive"].includes(status)) {
			return res.status(400).json({ message: "Invalid status value" });
		}

		const updated = await FieldService.updateFieldStatus(id, status);

		if (!updated) {
			return res.status(404).json({ message: "Field not found" });
		}

		return res.json({
			message: "Cập nhật trạng thái thành công",
			data: updated,
		});
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};
