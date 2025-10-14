"use strict";
import { v4 as uuidv4 } from "uuid";

export default {
  async up(queryInterface, Sequelize) {
    // 🔹 Lấy dữ liệu booking thực tế trong DB (đã có FK tới userId, venueId)
    const [bookings] = await queryInterface.sequelize.query(
      `SELECT id, userId FROM bookings;`
    );

    if (!bookings || bookings.length === 0) {
      throw new Error("⚠️ Không tìm thấy dữ liệu trong bảng bookings. Hãy seed bookings trước.");
    }

    const payments = bookings.slice(0, 10).map((booking, index) => ({
      bookingId: booking.id,
      userId: booking.userId, // dùng đúng userId từ booking
      paymentMethod: index % 2 === 0 ? "Credit Card" : "Cash",
      status:
        index % 3 === 0 ? "failed" : index % 2 === 0 ? "complete" : "pending", // sửa 'padding' -> 'pending'
      transactionId: `TXN-${1000 + index + 1}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert("payments", payments, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("payments", null, {});
  },
};
