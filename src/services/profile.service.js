import { ProfileRepository, UserRepository } from "../repositories/index.js";

export const getAllProfiles = async () => ProfileRepository.findAll();

export const getProfileById = async (id) => ProfileRepository.findById(id);

export const createProfile = async (data) => {
  const user = await UserRepository.findById(data.userId);
  if (!user) throw new Error("User not found");
  return ProfileRepository.create(data);
};

export const updateProfile = async (id, data) => ProfileRepository.update(id, data);

export const deleteProfile = async (id) => ProfileRepository.remove(id);
