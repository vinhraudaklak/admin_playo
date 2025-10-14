export default {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("bookings", {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			venueId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: "venues", key: "id" },
				onDelete: "CASCADE",
			},
			userId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: { model: "users", key: "id" },
				onDelete: "CASCADE",
			},
			slotId: {
				type: Sequelize.INTEGER,
				references: { model: "venue_slots", key: "id" },
				onDelete: "SET NULL",
			},
			sportId: {
				type: Sequelize.INTEGER,
				references: { model: "sports", key: "id" },
				onDelete: "SET NULL",
			},
			bookingDate: { type: Sequelize.DATEONLY, allowNull: false },
			startTime: { type: Sequelize.TIME, allowNull: false },
			endTime: { type: Sequelize.TIME, allowNull: false },
			status: {
				type: Sequelize.ENUM("pending", "confirmed", "cancelled"),
				defaultValue: "pending",
			},
			hourly: { type: Sequelize.BOOLEAN, defaultValue: false },
			ticketPrice: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
			totalPrice: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
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
		await queryInterface.dropTable("bookings");
	},
};
