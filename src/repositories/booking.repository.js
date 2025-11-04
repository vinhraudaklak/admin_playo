import db from "../database/models/index.js";
import { Op } from "sequelize";

const { Booking, User, Venue, VenueSlot, Sport, Payment, Review } = db;

/**
 * 🔍 Format booking trả về FE
 */
const formatBooking = (b) => ({
	id: b.id,
	bookingDate: b.bookingDate,
	startTime: b.startTime,
	endTime: b.endTime,
	status: b.status,
	totalPrice: b.totalPrice,
	venueName: b.venue?.name || null,
	venueLocation: b.venue?.address || null,
	sportName: b.sport?.name || null,
	slotId: b.slotId,
	createdAt: b.createdAt,
});

/**
 * 📋 Lấy tất cả bookings
 */
export const getAll = async () => {
	const bookings = await Booking.findAll({
		include: [
			{ model: User, as: "user", attributes: ["id", "name", "email"] },
			{
				model: Venue,
				as: "venue",
				attributes: ["id", "name", "address"],
			},
			{
				model: VenueSlot,
				as: "slot",
				attributes: ["id", "startTime", "endTime"],
			},
			{ model: Sport, as: "sport", attributes: ["id", "name"] },
			{
				model: Payment,
				as: "payment",
				attributes: ["id", "status", "paymentMethod"],
			},
			{
				model: Review,
				as: "review",
				attributes: ["id", "rating", "comment"],
			},
		],
		order: [["createdAt", "DESC"]],
	});
	return bookings.map(formatBooking);
};

/**
 * 🔍 Lấy booking theo ID
 */
export const getById = async (id) => {
	const b = await Booking.findByPk(id, {
		include: [
			{ model: User, as: "user", attributes: ["id", "name", "email"] },
			{
				model: Venue,
				as: "venue",
				attributes: ["id", "name", "address"],
			},
			{
				model: VenueSlot,
				as: "slot",
				attributes: ["id", "startTime", "endTime"],
			},
			{ model: Sport, as: "sport", attributes: ["id", "name"] },
			{ model: Payment, as: "payment", attributes: ["id", "status"] },
			{
				model: Review,
				as: "review",
				attributes: ["id", "rating", "comment"],
			},
		],
	});

	if (!b) return null;

	return {
		...formatBooking(b),
		userId: b.userId, // 🧩 thêm để kiểm tra quyền ở controller
	};
};

/**
 * 👤 Lấy booking theo user
 */
export const findByUserId = async (userId) => {
	const bookings = await Booking.findAll({
		where: { userId },
		include: [
			{
				model: Venue,
				as: "venue",
				attributes: ["id", "name", "address"],
			},
			{
				model: VenueSlot,
				as: "slot",
				attributes: ["id", "startTime", "endTime"],
			},
			{ model: Sport, as: "sport", attributes: ["id", "name"] },
		],
		order: [["bookingDate", "DESC"]],
	});
	return bookings.map(formatBooking);
};

/**
 * ➕ Tạo booking
 */
export const create = (data) => Booking.create(data);

/**
 * ✏️ Update booking
 */
export const update = async (id, data) => {
	const booking = await Booking.findByPk(id);
	if (!booking) return null;
	return booking.update(data);
};

/**
 * ❌ Delete booking
 */
export const remove = async (id) => {
	const booking = await Booking.findByPk(id);
	if (!booking) return null;
	await booking.destroy();
	return true;
};

/**
 * ⚙️ Check trùng giờ
 */
export const checkDuplicate = async (
	venueId,
	bookingDate,
	startTime,
	endTime
) => {
	const conflict = await Booking.findOne({
		where: {
			venueId,
			bookingDate,
			[Op.or]: [
				{ startTime: { [Op.between]: [startTime, endTime] } },
				{ endTime: { [Op.between]: [startTime, endTime] } },
				{
					[Op.and]: [
						{ startTime: { [Op.lte]: startTime } },
						{ endTime: { [Op.gte]: endTime } },
					],
				},
			],
		},
	});
	return !!conflict;
};
