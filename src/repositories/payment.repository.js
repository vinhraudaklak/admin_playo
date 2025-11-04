import db from "../database/models/index.js";
const { Payment, Booking, User, Venue } = db;

export const create = async (data) => Payment.create(data);

export const findById = async (id) =>
	Payment.findByPk(id, {
		include: [
			{
				model: Booking,
				as: "booking",
				include: [{ model: Venue, as: "venue" }],
			},
			{ model: User, as: "user" },
		],
	});

export const findAll = async () =>
	Payment.findAll({
		include: [
			{
				model: Booking,
				as: "booking",
				include: [{ model: Venue, as: "venue" }],
			},
			{ model: User, as: "user" },
		],
		order: [["createdAt", "DESC"]],
	});

export const update = async (id, data) => {
	const payment = await Payment.findByPk(id);
	if (!payment) return null;
	return payment.update(data);
};

export const remove = async (id) => {
	const payment = await Payment.findByPk(id);
	if (!payment) return null;
	await payment.destroy();
	return true;
};

export const updateByBooking = async (bookingId, data) => {
	const payment = await Payment.findOne({ where: { bookingId } });
	if (!payment) return null;
	return payment.update(data);
};
