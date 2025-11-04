import VenueSlotRepository from "../repositories/venueSlot.repository.js";

// 🔹 Lấy tất cả slots
export const getAllSlots = async () => {
  const slots = await VenueSlotRepository.findAll();
  return slots;
};

export const getSlotsByVenue = async (venueId) => {
  const venue = await VenueRepository.findById(venueId);
  if (!venue) throw new Error("Venue not found");

  const slots = await VenueSlotRepository.findAll({ venueId });
  return slots;
};

export const getSlotById = async (id) => {
  const slot = await VenueSlotRepository.findById(id);
  if (!slot) throw new Error("Slot not found");
  return slot;
};

export const createSlot = async (venueId, data) => {
  const venue = await VenueRepository.findById(venueId);
  if (!venue) throw new Error("Venue not found");

  const slot = await VenueSlotRepository.create({
    ...data,
    venueId,
  });
  return slot;
};

export const updateSlot = async (id, data) => {
  const slot = await VenueSlotRepository.findById(id);
  if (!slot) throw new Error("Slot not found");

  const updatedSlot = await VenueSlotRepository.update(id, data);
  return updatedSlot;
};

export const deleteSlot = async (id) => {
  const slot = await VenueSlotRepository.findById(id);
  if (!slot) throw new Error("Slot not found");

  await VenueSlotRepository.remove(id);
  return { message: "Slot deleted successfully" };
};
