import { PaymentRepository, BookingRepository } from "../repositories/index.js";

export const getAllPayments = async () => PaymentRepository.findAll();

export const getPaymentById = async (id) => PaymentRepository.findById(id);

export const createPayment = async (data) => {
  const booking = await BookingRepository.findById(data.bookingId);
  if (!booking) throw new Error("Booking not found");

  const payment = await PaymentRepository.create({ ...data, status: data.status || "pending" });

  if (payment.status === "paid") {
    await BookingRepository.update(booking.id, { status: "confirmed" });
  }

  return payment;
};

export const updatePayment = async (id, data) => PaymentRepository.update(id, data);

export const deletePayment = async (id) => PaymentRepository.remove(id);
