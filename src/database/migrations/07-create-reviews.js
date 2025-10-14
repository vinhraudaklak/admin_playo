export default {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("reviews", {
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
			venueId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: "venues", key: "id" },
				onDelete: "CASCADE",
			},
			rating: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			comment: Sequelize.TEXT,
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
		await queryInterface.dropTable("reviews");
	},
};
