import { ReviewRepository, FieldRepository, UserRepository } from "../repositories/index.js";

export const getAllReviews = async () => ReviewRepository.findAll();

export const getReviewById = async (id) => ReviewRepository.findById(id);

export const createReview = async (data) => {
  const field = await FieldRepository.findById(data.fieldId);
  if (!field) throw new Error("Field not found");

  const user = await UserRepository.findById(data.userId);
  if (!user) throw new Error("User not found");

  return ReviewRepository.create(data);
};

export const updateReview = async (id, data) => ReviewRepository.update(id, data);

export const deleteReview = async (id) => ReviewRepository.remove(id);
