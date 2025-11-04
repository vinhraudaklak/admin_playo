  import { VenueRepository } from "../repositories/index.js";

export const getAllVenues = async () => {
  return await VenueRepository.findAll();
};

export const getVenueById = async (id) => {
  const venue = await VenueRepository.findById(id);
  if (!venue) throw new Error("Venue not found");
  return venue;
};

export const createVenue = async (data, ownerUserId) => {
  const newVenue = await VenueRepository.create({
    ...data,
    ownerUserId,
  });
  return newVenue;
};

export const updateVenue = async (id, data) => {
  const venue = await VenueRepository.findById(id);
  if (!venue) throw new Error("Venue not found");

  const updatedVenue = await VenueRepository.update(id, data);
  return updatedVenue;
};

export const deleteVenue = async (id) => {
  const venue = await VenueRepository.findById(id);
  if (!venue) throw new Error("Venue not found");

  await VenueRepository.remove(id);
  return { message: "Venue deleted successfully" };
};
