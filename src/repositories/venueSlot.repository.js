// src/repositories/venueSlotRepository.js
import db from "../database/models/index.js";

const VenueSlot = db.VenueSlot;

class VenueSlotRepository {
  async findAll() {
    return await VenueSlot.findAll({
      include: [
        { model: db.Venue, as: "venue" },
        { model: db.Sport, as: "sport" },
      ],
      order: [["startTime", "ASC"]],
    });
  }

  async findByVenue(venueId) {
    return await VenueSlot.findAll({
      where: { venueId },
      include: [
        { model: db.Venue, as: "venue" },
        { model: db.Sport, as: "sport" },
      ],
      order: [["startTime", "ASC"]],
    });
  }

  async findById(id) {
    return await VenueSlot.findByPk(id, {
      include: [
        { model: db.Venue, as: "venue" },
        { model: db.Sport, as: "sport" },
      ],
    });
  }

  async create(data) {
    return await VenueSlot.create(data);
  }

  async update(id, data) {
    const slot = await VenueSlot.findByPk(id);
    if (!slot) return null;
    return await slot.update(data);
  }

  async remove(id) {
    const slot = await VenueSlot.findByPk(id);
    if (!slot) return null;
    await slot.destroy();
    return true;
  }
}

export default new VenueSlotRepository();
