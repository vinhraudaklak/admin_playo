export default {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("slot_users", {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			slotId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: "venue_slots", key: "id" },
				onDelete: "CASCADE",
			},
			userId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: { model: "users", key: "id" },
				onDelete: "CASCADE",
			},
			role: {
				type: Sequelize.ENUM("member", "default", "guest"),
				defaultValue: "default",
			},
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
		await queryInterface.dropTable("slot_users");
	},
};
