import { BookingRepository, SlotRepository, UserRepository } from "../repositories/index.js";

export const getAllBookings = async () => BookingRepository.findAll();

export const getBookingById = async (id) => BookingRepository.findById(id);

export const createBooking = async (data) => {
  const user = await UserRepository.findById(data.userId);
  if (!user) throw new Error("User not found");

  const slot = await SlotRepository.findById(data.slotId);
  if (!slot) throw new Error("Slot not found");
  if (slot.status !== "available") throw new Error("Slot not available");

  await SlotRepository.update(data.slotId, { status: "booked" });
  return BookingRepository.create(data);
};

export const updateBooking = async (id, data) => BookingRepository.update(id, data);

export const deleteBooking = async (id) => {
  const booking = await BookingRepository.findById(id);
  if (!booking) return null;

  await SlotRepository.update(booking.slotId, { status: "available" });
  return BookingRepository.remove(id);
};
