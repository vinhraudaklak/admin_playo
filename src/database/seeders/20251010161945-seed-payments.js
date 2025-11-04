"use strict";
import { v4 as uuidv4 } from "uuid";

export default {
  async up(queryInterface, Sequelize) {
    // 🔹 Lấy dữ liệu booking có thật (đảm bảo đã seed bookings trước)
    const [bookings] = await queryInterface.sequelize.query(
      `SELECT id, userId FROM bookings;`
    );

    if (!bookings || bookings.length === 0) {
      throw new Error("⚠️ Không tìm thấy dữ liệu trong bảng bookings. Hãy seed bookings trước.");
    }

    // 🔹 Tạo danh sách payments mẫu
    const payments = bookings.slice(0, 10).map((booking, index) => ({
      bookingId: booking.id,
      userId: booking.userId,
      paymentMethod: index % 2 === 0 ? "BANK" : "COD",
      status:
        index % 3 === 0 ? "failed" : index % 2 === 0 ? "success" : "pending",
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
