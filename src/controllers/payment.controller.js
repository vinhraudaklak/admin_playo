import { PaymentService } from "../services/index.js";

export const getAllPayments = async (req, res) => {
  try {
    const payments = await PaymentService.getAllPayments();
    return res.json(payments);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getPaymentById = async (req, res) => {
  try {
    const payment = await PaymentService.getPaymentById(req.params.id);
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    return res.json(payment);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const createPayment = async (req, res) => {
  try {
    const payment = await PaymentService.createPayment(req.body);
    return res.status(201).json(payment);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updatePayment = async (req, res) => {
  try {
    const updated = await PaymentService.updatePayment(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Payment not found" });
    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deletePayment = async (req, res) => {
  try {
    const deleted = await PaymentService.deletePayment(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Payment not found" });
    return res.json({ message: "Payment deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
