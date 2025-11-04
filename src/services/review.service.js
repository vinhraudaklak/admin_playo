import ReviewRepository from "../repositories/review.repository.js";

import db from "../database/models/index.js";
const { Booking, User, Venue } = db;

class ReviewService {
  async findAll(query) {
    return ReviewRepository.findAll(query);
  }

  async findById(id) {
    return ReviewRepository.findById(id);
  }

  async create(data) {
    const { bookingId, userId, venueId } = data;

    const booking = await Booking.findOne({
      where: { id: bookingId, status: "confirmed" },
    });
    if (!booking) throw new Error("Booking not found or not confirmed");

    const user = await User.findByPk(userId);
    if (!user) throw new Error("User not found");

    const venue = await Venue.findByPk(venueId);
    if (!venue) throw new Error("Venue not found");

    return ReviewRepository.create(data);
  }

  async update(id, data) {
    const updated = await ReviewRepository.update(id, data);
    if (!updated) throw new Error("Review not found");
    return updated;
  }

  async remove(id) {
    const deleted = await ReviewRepository.remove(id);
    if (!deleted) throw new Error("Review not found");
    return deleted;
  }
}

export default new ReviewService();
