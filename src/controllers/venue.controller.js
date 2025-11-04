import { VenueService } from "../services/index.js";

export const getAllVenues = async (req, res) => {
  try {
    const result = await VenueService.getAllVenues();
    res.status(200).json({
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to get venues",
    });
  }
};

export const getVenueById = async (req, res) => {
  try {
    const result = await VenueService.getVenueById(req.params.id);
    res.status(200).json({
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to get venue",
    });
  }
};

export const createVenue = async (req, res) => {
  try {
    const ownerUserId = req.user?.id; // cần middleware auth gắn user vào req
    const result = await VenueService.createVenue(req.body, ownerUserId);
    res.status(201).json({
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create venue",
    });
  }
};

export const updateVenue = async (req, res) => {
  try {
    const result = await VenueService.updateVenue(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update venue",
    });
  }
};

export const deleteVenue = async (req, res) => {
  try {
    const result = await VenueService.deleteVenue(req.params.id);
    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to delete venue",
    });
  }
};
