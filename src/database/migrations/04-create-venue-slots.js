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
			level: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			date: {
				type: Sequelize.DATEONLY,
				allowNull: true,
			},
			startTime: {
				type: Sequelize.TIME,
				allowNull: true,
			},
			endTime: {
				type: Sequelize.TIME,
				allowNull: true,
			},
			isAvailable: {
				type: Sequelize.BOOLEAN,
				defaultValue: true,
			},
			listUsers: {
				type: Sequelize.TEXT,
				allowNull: true,
				defaultValue: "[]",
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
		});
	},

	down: async (queryInterface) => {
		await queryInterface.dropTable("venue_slots");
	},
};
