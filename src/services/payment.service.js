import { PaymentRepository } from "../repositories/index.js";
import { getBookingById, updateBooking } from "./booking.service.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: "2022-11-15",
});

// 🧾 Lấy tất cả
export const getAllPayments = async () => PaymentRepository.findAll();

// 🔍 Lấy 1 payment
export const getPaymentById = async (id) => PaymentRepository.findById(id);

// 💰 Tạo payment COD / BANK
export const createPayment = async (data) => {
	const { bookingId, paymentMethod, transactionId, userId } = data;

	const booking = await getBookingById(bookingId);
	if (!booking) throw new Error("Booking not found");
	if (booking.userId !== userId)
		throw new Error("Unauthorized booking access");

	const status = paymentMethod === "COD" ? "pending" : "success";

	const payment = await PaymentRepository.create({
		bookingId,
		userId,
		paymentMethod,
		status,
		transactionId: transactionId || null,
		amount: booking.totalPrice,
	});

	if (status === "success") {
		await updateBooking(bookingId, { status: "confirmed" });
	}

	return payment;
};

// 🔄 Admin xác nhận COD
export const updatePayment = async (id, data) => {
	const payment = await PaymentRepository.findById(id);
	if (!payment) throw new Error("Payment not found");

	const updated = await PaymentRepository.update(id, data);

	if (data.status === "success") {
		const booking = await getBookingById(payment.bookingId);
		if (booking) await updateBooking(booking.id, { status: "confirmed" });
	}

	return updated;
};

// ❌ Xoá payment
export const deletePayment = async (id) => PaymentRepository.remove(id);

// 🌐 Tạo thanh toán online (Stripe)
export const createOnlinePayment = async ({ bookingId, userId }) => {
	const booking = await getBookingById(bookingId);
	if (!booking) throw new Error("Booking not found");
	if (booking.userId !== userId)
		throw new Error("Unauthorized booking access");

	const amount = Math.round(booking.totalPrice || 100000);

	const payment = await PaymentRepository.create({
		bookingId,
		userId,
		paymentMethod: "STRIPE",
		status: "pending",
		amount,
	});

	// 🧾 Tạo phiên thanh toán Stripe
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		line_items: [
			{
				price_data: {
					currency: "vnd",
					product_data: { name: `Booking #${booking.id}` },
					unit_amount: amount, // số nhỏ nhất (vnd)
				},
				quantity: 1,
			},
		],
		mode: "payment",
		success_url: `${process.env.FRONTEND_URL}/payment-success`,
		cancel_url: `${process.env.FRONTEND_URL}/payment-failed`,
	});

	return { paymentUrl: session.url, payment };
};

// 🔄 Callback xác nhận
export const handlePaymentCallback = async (provider, query) => {
	let verified = false;
	let bookingId;

	if (provider === "vnpay") {
		const vnp_SecureHash = query.vnp_SecureHash;
		delete query.vnp_SecureHash;
		delete query.vnp_SecureHashType;

		const signData = querystring.stringify(query, { encode: false });
		const checkSum = crypto
			.createHmac("sha512", process.env.VNP_HASH_SECRET)
			.update(signData)
			.digest("hex");

		verified = vnp_SecureHash === checkSum;
		bookingId = query.vnp_OrderInfo?.match(/\d+/)?.[0];
	} else if (provider === "momo") {
		verified = query.resultCode === "0";
		bookingId = query.orderId;
	} else if (provider === "stripe") {
		verified = true;
		bookingId = query.bookingId;
	}

	if (verified && bookingId) {
		const booking = await getBookingById(bookingId);
		if (booking) {
			await updateBooking(bookingId, { status: "confirmed" });
			await PaymentRepository.updateByBooking(bookingId, {
				status: "success",
				paidAt: new Date(),
			});
		}
	}

	return verified;
};
