import { FieldService } from "../services/index.js";

export const getAllFields = async (req, res) => {
  try {
    const fields = await FieldService.getAllFields();
    return res.json(fields);
  } catch (err) {
    return res.status(500).json({ message: err.message });
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

export const createField = async (req, res) => {
  try {
    const field = await FieldService.createField(req.body);
    return res.status(201).json(field);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateField = async (req, res) => {
  try {
    const updated = await FieldService.updateField(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Field not found" });
    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteField = async (req, res) => {
  try {
    const deleted = await FieldService.deleteField(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Field not found" });
    return res.json({ message: "Field deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
