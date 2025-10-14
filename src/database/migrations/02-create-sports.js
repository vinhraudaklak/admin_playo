export default {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("sports", {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			name: { type: Sequelize.STRING, allowNull: false },
			description: Sequelize.TEXT,
			imgUrl: Sequelize.STRING,
			iconUrl: Sequelize.STRING,
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
		await queryInterface.dropTable("sports");
	},
};
