import { FieldRepository, PositionRepository, CategoryRepository } from "../repositories/index.js";

export const getAllFields = async () => FieldRepository.findAll();

export const getFieldById = async (id) => FieldRepository.findById(id);

export const createField = async (data) => {
  const position = await PositionRepository.findById(data.positionId);
  if (!position) throw new Error("Position not found");

  const category = await CategoryRepository.findById(data.categoryId);
  if (!category) throw new Error("Category not found");

  return FieldRepository.create(data);
};

export const updateField = async (id, data) => FieldRepository.update(id, data);

export const deleteField = async (id) => FieldRepository.remove(id);
