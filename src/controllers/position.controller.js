import { PositionService } from "../services/index.js";

export const getAllPositions = async (req, res) => {
  try {
    const positions = await PositionService.getAllPositions();
    return res.json(positions);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getPositionById = async (req, res) => {
  try {
    const position = await PositionService.getPositionById(req.params.id);
    if (!position) return res.status(404).json({ message: "Position not found" });
    return res.json(position);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const createPosition = async (req, res) => {
  try {
    const position = await PositionService.createPosition(req.body);
    return res.status(201).json(position);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updatePosition = async (req, res) => {
  try {
    const updated = await PositionService.updatePosition(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Position not found" });
    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deletePosition = async (req, res) => {
  try {
    const deleted = await PositionService.deletePosition(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Position not found" });
    return res.json({ message: "Position deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
