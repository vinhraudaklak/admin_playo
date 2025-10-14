export default {
	up: async (queryInterface, Sequelize) => {
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
			paymentMethod: { type: Sequelize.STRING, allowNull: false },
			status: {
				type: Sequelize.ENUM("padding", "complete", "failed"),
				defaultValue: "padding",
			},
			transactionId: Sequelize.STRING,
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface) => {
		await queryInterface.dropTable("payments");
	},
};
