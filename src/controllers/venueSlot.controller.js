import * as VenueSlotService from "../services/venueSlot.service.js";

// 🔹 Lấy tất cả slot
export const getAllSlots = async (req, res) => {
  try {
    const slots = await VenueSlotService.getAllSlots();
    res.json({ success: true, data: slots });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔹 Lấy slot theo ID
export const getSlotById = async (req, res) => {
  try {
    const slot = await VenueSlotService.getSlotById(req.params.id);
    if (!slot)
      return res.status(404).json({ success: false, message: "Slot not found" });
    res.json({ success: true, data: slot });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔹 Tạo slot mới
export const createSlot = async (req, res) => {
  try {
    const { venueId, ...data } = req.body;
    const newSlot = await VenueSlotService.createSlot(venueId, data);
    res.status(201).json({ success: true, data: newSlot });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 🔹 Cập nhật slot
export const updateSlot = async (req, res) => {
  try {
    const updatedSlot = await VenueSlotService.updateSlot(req.params.id, req.body);
    res.json({ success: true, data: updatedSlot });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 🔹 Xóa slot
export const deleteSlot = async (req, res) => {
  try {
    await VenueSlotService.deleteSlot(req.params.id);
    res.json({ success: true, message: "Slot deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
