import { ProfileService } from "../services/index.js";

export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await ProfileService.getAllProfiles();
    return res.json(profiles);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getProfileById = async (req, res) => {
  try {
    const profile = await ProfileService.getProfileById(req.params.id);
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    return res.json(profile);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const createProfile = async (req, res) => {
  try {
    const profile = await ProfileService.createProfile(req.body);
    return res.status(201).json(profile);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updated = await ProfileService.updateProfile(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Profile not found" });
    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const deleted = await ProfileService.deleteProfile(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Profile not found" });
    return res.json({ message: "Profile deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
