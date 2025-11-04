"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.dropTable("payments", { force: true }).catch(() => {}); // Xóa bảng cũ nếu có

  await queryInterface.createTable("payments", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    bookingId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "bookings", key: "id" },
      onDelete: "CASCADE",
    },

    userId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
    },

    // 💳 COD hoặc BANK
    paymentMethod: {
      type: Sequelize.ENUM("COD", "BANK", "STRIPE", "MOMO", "VNPAY"),
      allowNull: false,
      defaultValue: "COD",
    },

    // 🔁 Trạng thái thanh toán
    status: {
      type: Sequelize.ENUM("pending", "processing", "success", "failed"),
      allowNull: false,
      defaultValue: "pending",
    },

    transactionId: {
      type: Sequelize.STRING,
      allowNull: true,
    },

    // 💰 Số tiền
    amount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },

    // 🕒 Thời điểm thanh toán thành công
    paidAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },

    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal(
        "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
      ),
    },
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.sequelize.query("DROP TYPE IF EXISTS enum_payments_paymentMethod;");
  await queryInterface.sequelize.query("DROP TYPE IF EXISTS enum_payments_status;");
  await queryInterface.dropTable("payments");
}
