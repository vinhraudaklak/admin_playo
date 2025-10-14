import { SlotService } from "../services/index.js";

export const getAllSlots = async (req, res) => {
  try {
    const slots = await SlotRepository.findAll();
    return res.json(slots);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getSlotById = async (req, res) => {
  try {
    const slot = await SlotRepository.findById(req.params.id);
    if (!slot) return res.status(404).json({ message: "Slot not found" });
    return res.json(slot);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const createSlot = async (req, res) => {
  try {
    const slot = await SlotRepository.create(req.body);
    return res.status(201).json(slot);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateSlot = async (req, res) => {
  try {
    const updated = await SlotRepository.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Slot not found" });
    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteSlot = async (req, res) => {
  try {
    const deleted = await SlotRepository.remove(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Slot not found" });
    return res.json({ message: "Slot deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
