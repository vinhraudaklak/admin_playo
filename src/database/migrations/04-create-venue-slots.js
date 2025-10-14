export default {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("venue_slots", {
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
			sportId: {
				type: Sequelize.INTEGER,
				references: { model: "sports", key: "id" },
				onDelete: "SET NULL",
			},
			level: Sequelize.STRING,
			listUsers: Sequelize.JSON,
			date: Sequelize.DATEONLY,
			startTime: Sequelize.TIME,
			endTime: Sequelize.TIME,
			isAvailable: { type: Sequelize.BOOLEAN, defaultValue: true },
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
		await queryInterface.dropTable("venue_slots");
	},
};
