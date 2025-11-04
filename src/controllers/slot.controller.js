import { SlotService } from "../services/index.js";

export const getAllSlots = async (req, res) => {
  try {
    const slots = await SlotService.getAll();
    res.json(slots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSlotById = async (req, res) => {
  try {
    const slot = await SlotService.getById(req.params.id);
    if (!slot) return res.status(404).json({ message: "Slot not found" });

    const formatted = {
      ...slot.toJSON(),
      listUsers:
        slot.slotUsers?.map((p) => ({
          userId: p.userId,
          name: p.user?.name || "Unknown",
        })) || [],
    };

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Tạo slot
export const createSlot = async (req, res) => {
  try {
    const slot = await SlotService.create(req.body);
    res.status(201).json(slot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Cập nhật slot
export const updateSlot = async (req, res) => {
  try {
    const slot = await SlotService.update(req.params.id, req.body);
    if (!slot) return res.status(404).json({ message: "Slot not found" });
    res.json(slot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Xóa slot
export const deleteSlot = async (req, res) => {
  try {
    await SlotService.remove(req.params.id);
    res.json({ message: "Slot deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Tham gia slot
export const joinSlot = async (req, res) => {
  try {
    const slotId = req.params.id;
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: "Thiếu userId" });

    const updated = await SlotService.joinSlot(slotId, { userId });
    res.json(updated);
  } catch (err) {
    console.error("❌ joinSlot error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Rời slot
export const leaveSlot = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: "Thiếu userId" });

    const updated = await SlotService.leaveSlot(id, userId);
    res.json(updated);
  } catch (err) {
    console.error("❌ leaveSlot error:", err);
    res.status(500).json({ message: err.message });
  }
};
