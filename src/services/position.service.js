import { PositionRepository } from "../repositories/index.js";

export const getAllPositions = async () => PositionRepository.findAll();

export const getPositionById = async (id) => PositionRepository.findById(id);

export const createPosition = async (data) => PositionRepository.create(data);

export const updatePosition = async (id, data) => PositionRepository.update(id, data);

export const deletePosition = async (id) => PositionRepository.remove(id);
