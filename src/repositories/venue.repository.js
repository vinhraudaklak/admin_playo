import db from "../database/models/index.js";

const Venue = db.Venue;

class VenueRepository {
  // 🔹 Lấy tất cả sân
  async findAll() {
    return await Venue.findAll({
      include: [
        { model: db.Sport, as: "sport" },
        { model: db.VenueSlot, as: "slots" },
      ],
      order: [["createdAt", "DESC"]],
    });
  }

  // 🔹 Lấy sân theo ID
  async findById(id) {
    return await Venue.findByPk(id, {
      include: [
        { model: db.Sport, as: "sport" },
        { model: db.VenueSlot, as: "slots" },
        { model: db.Review, as: "reviews" },
      ],
    });
  }

  // 🔹 Lấy danh sách sân theo môn thể thao (nếu có)
  async findBySport(sportId) {
    return await Venue.findAll({
      where: { sportId },
      include: [
        { model: db.Sport, as: "sport" },
        { model: db.VenueSlot, as: "slots" },
      ],
      order: [["createdAt", "DESC"]],
    });
  }

  // 🔹 Tạo sân mới
  async create(data) {
    return await Venue.create(data);
  }

  // 🔹 Cập nhật sân
  async update(id, data) {
    const venue = await Venue.findByPk(id);
    if (!venue) return null;
    return await venue.update(data);
  }

  // 🔹 Xóa sân
  async remove(id) {
    const venue = await Venue.findByPk(id);
    if (!venue) return null;
    await venue.destroy();
    return true;
  }
}

export default new VenueRepository();
