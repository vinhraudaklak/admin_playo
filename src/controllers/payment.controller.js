import { PaymentService } from "../services/index.js";

/**
 * 🧾 [ADMIN] Lấy tất cả payments
 */
export const getAllPayments = async (req, res) => {
	try {
		// Chỉ admin mới được xem danh sách tất cả
		if (req.user.role !== "admin") {
			return res.status(403).json({ message: "Forbidden: Admin only" });
		}

		const payments = await PaymentService.getAllPayments();
		return res.status(200).json({
			data: payments,
			message: "Fetched all payments successfully",
		});
	} catch (err) {
		console.error("getAllPayments error:", err);
		return res.status(500).json({ message: err.message });
	}
};

/**
 * 🔍 Lấy chi tiết 1 payment
 * - Admin: xem được tất cả
 * - User: chỉ xem payment của chính mình
 */
export const getPaymentById = async (req, res) => {
	try {
		const payment = await PaymentService.getPaymentById(req.params.id);
		if (!payment) {
			return res.status(404).json({ message: "Payment not found" });
		}

		// Quyền xem
		if (req.user.role !== "admin" && payment.userId !== req.user.id) {
			return res
				.status(403)
				.json({ message: "Forbidden: Access denied" });
		}

		return res.status(200).json({
			data: payment,
			message: "Fetched payment detail successfully",
		});
	} catch (err) {
		console.error("getPaymentById error:", err);
		return res.status(500).json({ message: err.message });
	}
};

/**
 * 💰 Tạo payment (COD hoặc BANK)
 */
export const createPayment = async (req, res) => {
	try {
		const payload = {
			...req.body,
			userId: req.user.id,
		};

		const payment = await PaymentService.createPayment(payload);
		return res.status(201).json({
			data: payment,
			message: "Payment created successfully",
		});
	} catch (err) {
		console.error("createPayment error:", err);
		return res.status(400).json({ message: err.message });
	}
};

/**
 * 🔄 [ADMIN] Cập nhật payment (VD: xác nhận COD)
 */
export const updatePayment = async (req, res) => {
	try {
		if (req.user.role !== "admin") {
			return res.status(403).json({ message: "Forbidden: Admin only" });
		}

		const updatedPayment = await PaymentService.updatePayment(
			req.params.id,
			req.body
		);

		if (!updatedPayment) {
			return res.status(404).json({ message: "Payment not found" });
		}

		return res.status(200).json({
			data: updatedPayment,
			message: "Payment updated successfully",
		});
	} catch (err) {
		console.error("updatePayment error:", err);
		return res.status(500).json({ message: err.message });
	}
};

/**
 * ❌ [ADMIN] Xóa payment
 */
export const deletePayment = async (req, res) => {
	try {
		if (req.user.role !== "admin") {
			return res.status(403).json({ message: "Forbidden: Admin only" });
		}

		const deleted = await PaymentService.deletePayment(req.params.id);

		if (!deleted) {
			return res.status(404).json({ message: "Payment not found" });
		}

		return res
			.status(200)
			.json({ message: "Payment deleted successfully" });
	} catch (err) {
		console.error("deletePayment error:", err);
		return res.status(500).json({ message: err.message });
	}
};

/**
 * 🌐 Tạo thanh toán online (Stripe, Momo, VNPay...)
 * body: { bookingId, method: 'stripe' | 'momo' | 'vnpay' }
 */
export const createOnlinePayment = async (req, res) => {
	try {
		const { bookingId } = req.body;
		if (!bookingId) {
			return res
				.status(400)
				.json({ message: "Missing bookingId or method" });
		}

		const { paymentUrl } = await PaymentService.createOnlinePayment({
			bookingId,
			userId: req.user.id,
		});

		return res.status(200).json({
			message: "Stripe payment session created",
			data: { paymentUrl },
		});
	} catch (err) {
		console.error("createOnlinePayment error:", err);
		return res.status(400).json({ message: err.message });
	}
};

/**
 * 🔁 Callback xác nhận thanh toán (từ Stripe / Momo / VNPay)
 * - Được gọi bởi bên thứ ba sau khi người dùng thanh toán
 */
export const handlePaymentCallback = async (req, res) => {
	try {
		const { provider } = req.params; // stripe | momo | vnpay

		const result = await PaymentService.handlePaymentCallback(
			provider,
			req.query
		);

		// URL FE deploy (đã có trailing slash)
		const frontendUrl =
			process.env.FRONTEND_URL || "https://playo-fe.vercel.app/";

		if (result?.success) {
			return res.redirect(`${frontendUrl}payment-success`);
		} else {
			return res.redirect(`${frontendUrl}payment-failed`);
		}
	} catch (err) {
		console.error("handlePaymentCallback error:", err);
		return res.status(500).send("Callback failed");
	}
};
