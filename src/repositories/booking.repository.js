import db from "../database/models/index.js";

const Booking = db.Booking;

class BookingRepository {
	async getAll() {
		return await Booking.findAll({ include: [db.User, db.Slot, db.Field] });
	}

	async getById(id) {
		return await Booking.findByPk(id, {
			include: [db.User, db.Slot, db.Field],
		});
	}

	async create(data) {
		return await Booking.create(data);
	}

	async update(id, data) {
		const booking = await Booking.findByPk(id);
		if (!booking) return null;
		return await booking.update(data);
	}

	async delete(id) {
		const booking = await Booking.findByPk(id);
		if (!booking) return null;
		await booking.destroy();
		return true;
	}
}

export default new BookingRepository();
