import { SlotRepository } from "../repositories/index.js";
import db from "../database/models/index.js";

const { SlotUser, VenueSlot, Venue, User, Sport } = db;

// 🟢 Lấy tất cả slots
export const getAll = async () => {
  return VenueSlot.findAll({
    include: [
      {
        model: SlotUser,
        as: "slotUsers",
        include: [{ model: User, as: "user" }],
      },
      { model: Venue, as: "venue" },
      { model: Sport, as: "sport" },
    ],
    order: [["date", "ASC"]],
  });
};

// 🟢 Lấy slot theo ID
export const getById = async (id) => {
  return VenueSlot.findByPk(id, {
    include: [
      {
        model: SlotUser,
        as: "slotUsers",
        include: [{ model: User, as: "user" }],
      },
      { model: Venue, as: "venue" },
      { model: Sport, as: "sport" },
    ],
  });
};

// 🟢 Tạo slot
export const create = async (data) => {
  const venue = await Venue.findByPk(data.venueId);
  if (!venue) throw new Error("Venue not found");
  return SlotRepository.create(data);
};

// 🟢 Cập nhật slot
export const update = async (id, data) => {
  return SlotRepository.update(id, data);
};

// 🟢 Xóa slot
export const remove = async (id) => {
  return SlotRepository.remove(id);
};

// 🟢 Tham gia slot
export const joinSlot = async (id, { userId }) => {
  const slot = await VenueSlot.findByPk(id, { include: [{ model: Venue, as: "venue" }] });
  if (!slot) throw new Error("Slot not found");

  // ⚠️ Kiểm tra slot đầy chưa
  const currentCount = await SlotUser.count({ where: { slotId: id } });
  const maxSlots = slot.venue?.stock || 0;
  if (maxSlots > 0 && currentCount >= maxSlots) {
    throw new Error("Số lượng người chơi đã đầy");
  }

  const existing = await SlotUser.findOne({ where: { slotId: id, userId } });
  if (existing) throw new Error("User đã tham gia slot này");

  await SlotUser.create({ slotId: id, userId, role: "member" });
  return getById(id);
};

// 🟢 Rời slot
export const leaveSlot = async (id, userId) => {
  const slot = await VenueSlot.findByPk(id);
  if (!slot) throw new Error("Slot not found");

  await SlotUser.destroy({ where: { slotId: id, userId } });
  return getById(id);
};
