import db from "../database/models/index.js";

const Payment = db.Payment;

export const create = async (data) => Payment.create(data);

export const findById = async (id) =>
  Payment.findByPk(id, { include: [db.Booking, db.User] });

export const findAll = async () =>
  Payment.findAll({ include: [db.Booking, db.User] });

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
