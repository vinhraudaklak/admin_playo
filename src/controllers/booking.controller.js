import { BookingService, PaymentService } from "../services/index.js";

// 🧱 Helper format response
const sendResponse = (res, status, message, data = null) =>
	res.status(status).json({ message, ...(data && { data }) });

/* ==========================
   📘 GET: Admin – All Bookings
========================== */
export const getAllBooking = async (req, res) => {
	  try {
    const bookings = await BookingService.getAllBookings();
    return res.status(200).json({
      message: "Fetched all bookings successfully",
      data: bookings,
    });
  } catch (err) {
    console.error("❌ getAllBooking error:", err);
    return res.status(500).json({ message: err.message });
  }
};

/* ==========================
   📘 GET: Single Booking by ID
========================== */
export const getBookingById = async (req, res) => {
	try {
		const booking = await BookingService.getBookingById(req.params.id);
		if (!booking) return sendResponse(res, 404, "Booking not found");
		return sendResponse(res, 200, "Fetched booking detail", booking);
	} catch (err) {
		return sendResponse(res, 500, err.message);
	}
};

/* ==========================
   👤 GET: User’s Own Bookings
========================== */
export const getUserBookings = async (req, res) => {
	try {
		const bookings = await BookingService.getUserBookings(req.user.id);
		return sendResponse(res, 200, "Fetched user bookings", bookings);
	} catch (err) {
		return sendResponse(res, 500, err.message);
	}
};

/* ==========================
   🏷️ POST: Create Booking (no payment)
========================== */
export const createBooking = async (req, res) => {
	try {
		const data = { ...req.body, userId: req.user.id }; // 🧭 tự động gán userId từ token
		const booking = await BookingService.createBooking(data);
		return sendResponse(res, 201, "Booking created successfully", booking);
	} catch (err) {
		console.log("User not found!");
		throw new Error("User not found!");
	}
};

/* ==========================
   💰 POST: Create Booking + Payment (COD / Bank)
========================== */
export const createBookingWithPayment = async (req, res) => {
	try {
		const userId = req.user?.id;
		if (!userId) return sendResponse(res, 401, "Unauthorized");

		const {
			venueId,
			slotId,
			bookingDate,
			startTime,
			duration = 60,
			ticketPrice,
			totalPrice,
			paymentMethod,
		} = req.body;

		// ✅ Validate required fields
		if (!venueId || !slotId || !bookingDate || !startTime || !ticketPrice) {
			return sendResponse(res, 400, "Missing required fields");
		}

		// 🕒 Chuẩn hóa start/end time
		const normalizedStart = /^\d{2}:\d{2}$/.test(startTime)
			? `${startTime}:00`
			: startTime;
		const startDate = new Date(`${bookingDate}T${normalizedStart}`);
		const endDate = new Date(startDate.getTime() + duration * 60 * 1000);
		const endTime = `${String(endDate.getHours()).padStart(
			2,
			"0"
		)}:${String(endDate.getMinutes()).padStart(2, "0")}:00`;

		// ✅ Kiểm tra sân trống
		const isAvailable = await BookingService.checkBookingAvailability({
			venueId,
			bookingDate,
			startTime: normalizedStart,
			endTime,
		});
		if (!isAvailable)
			return sendResponse(res, 400, "This time slot is already booked");

		// ✅ Tạo booking
		const bookingPayload = {
			venueId,
			slotId,
			userId,
			bookingDate,
			startTime: normalizedStart,
			endTime,
			ticketPrice,
			totalPrice: totalPrice || ticketPrice,
			status: paymentMethod === "cod" ? "pending" : "confirmed",
		};
		const booking = await BookingService.createBooking(bookingPayload);

		// ✅ Tạo payment record
		const paymentPayload = {
			bookingId: booking.id,
			userId,
			paymentMethod,
			amount: totalPrice,
			status: paymentMethod === "cod" ? "pending" : "success",
		};
		const payment = await PaymentService.createPayment(paymentPayload);

		// Nếu không phải COD → xác nhận booking luôn
		if (payment.status === "complete") {
			await BookingService.updateBooking(booking.id, {
				status: "confirmed",
			});
		}

		return sendResponse(
			res,
			201,
			"Booking & Payment created successfully",
			{
				booking,
				payment,
			}
		);
	} catch (err) {
		console.error("❌ createBookingWithPayment error:", err);
		return sendResponse(res, 500, err.message);
	}
};

/* ==========================
   ✏️ PUT: Update Booking
========================== */
export const updateBooking = async (req, res) => {
	try {
		const updated = await BookingService.updateBooking(
			req.params.id,
			req.body
		);
		if (!updated) return sendResponse(res, 404, "Booking not found");
		return sendResponse(res, 200, "Booking updated successfully", updated);
	} catch (err) {
		return sendResponse(res, 400, err.message);
	}
};

/* ==========================
   ❌ DELETE: Booking
========================== */
export const deleteBooking = async (req, res) => {
	try {
		const deleted = await BookingService.deleteBooking(req.params.id);
		if (!deleted) return sendResponse(res, 404, "Booking not found");
		return sendResponse(res, 200, "Booking deleted successfully");
	} catch (err) {
		return sendResponse(res, 500, err.message);
	}
};

/* ==========================
   🔍 POST: Check Slot Availability
========================== */
export const checkBookingAvailability = async (req, res) => {
	try {
		const available = await BookingService.checkBookingAvailability(
			req.body
		);
		return sendResponse(res, 200, "Availability checked", { available });
	} catch (err) {
		return sendResponse(res, 400, err.message);
	}
};
