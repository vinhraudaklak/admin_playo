import {
	BookingRepository,
	SlotRepository,
	UserRepository,
	PaymentRepository,
} from "../repositories/index.js";

/**
 * 🧾 Lấy tất cả booking (Admin)
 */
export const getAllBookings = () => BookingRepository.getAll();

/**
 * 🔍 Lấy 1 booking theo ID
 */
export const getBookingById = (id) => BookingRepository.getById(id);

/**
 * 👤 Lấy booking của 1 user
 */
export const getUserBookings = (userId) =>
	BookingRepository.findByUserId(userId);

/**
 * 🏷️ Tạo booking (chưa thanh toán)
 */
export const createBooking = async (data) => {
	// 1️⃣ Kiểm tra user tồn tại
	const user = await UserRepository.findById(data.userId);
	if (!user) throw new Error("User not found");

	// 2️⃣ Tính endTime (nếu chưa có)
	let endTime = data.endTime;
	if (!endTime && data.startTime && data.hourly) {
		const [h, m] = data.startTime.split(":").map(Number);
		const newHour = h + Number(data.hourly);
		endTime = `${String(newHour).padStart(2, "0")}:${String(m).padStart(
			2,
			"0"
		)}`;
	}

	// Check trùng giờ
	const duplicate = await BookingRepository.checkDuplicate(
		data.venueId,
		data.bookingDate,
		data.startTime,
		data.endTime
	);
	if (duplicate) throw new Error("This time slot is already booked");

	// Cập nhật slot nếu có
	if (data.slotId)
		await SlotRepository.update(data.slotId, { isAvailable: false });

	// 5️⃣ Tạo booking
	const newBooking = await BookingRepository.create({
		...data,
		endTime,
		status: "pending",
	});

	return newBooking;
};

export const createBookingWithPayment = async (data) => {
	// Tạo booking
	const booking = await createBooking(data);
	const payment = await PaymentRepository.create({
		bookingId: booking.id,
		amount: data.totalPrice,
		method: data.paymentMethod,
		status: data.paymentMethod === "cod" ? "pending" : "complete",
	});
	if (payment.status === "complete") {
		await BookingRepository.update(booking.id, { status: "confirmed" });
	}

	return { booking, payment };
};
export const updateBooking = (id, data) => BookingRepository.update(id, data);
export const deleteBooking = async (id) => {
	const booking = await BookingRepository.getById(id);
	if (!booking) return null;

	if (booking.slotId) {
		await SlotRepository.update(booking.slotId, { isAvailable: true });
	}

	return BookingRepository.remove(id);
};

/**
 * 🔍 Kiểm tra sân có bị trùng giờ không
 */
export const checkBookingAvailability = async ({
	venueId,
	bookingDate,
	startTime,
	endTime,
}) => {
	const duplicate = await BookingRepository.checkDuplicate(
		venueId,
		bookingDate,
		startTime,
		endTime
	);
	return !duplicate;
};
