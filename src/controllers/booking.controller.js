import { BookingService } from "../services/index.js";

export const getAllBooking = async (req, res) => {
  try {
    const booking = await BookingService.getAllBooking();
    return res.json(booking);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await BookingService.getBookingById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    return res.json(booking);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const createBooking = async (req, res) => {
  try {
    const booking = await BookingService.createBooking(req.body);
    return res.status(201).json(booking);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const updated = await BookingService.updateBooking(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Booking not found" });
    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const deleted = await BookingService.deleteBooking(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Booking not found" });
    return res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
