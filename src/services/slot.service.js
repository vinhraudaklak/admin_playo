import { SlotRepository, FieldRepository } from "../repositories/index.js";

export const getAllSlots = async () => SlotRepository.findAll();

export const getSlotById = async (id) => SlotRepository.findById(id);

export const createSlot = async (data) => {
  const field = await FieldRepository.findById(data.fieldId);
  if (!field) throw new Error("Field not found");
  return SlotRepository.create(data);
};

export const updateSlot = async (id, data) => SlotRepository.update(id, data);

export const deleteSlot = async (id) => SlotRepository.remove(id);
