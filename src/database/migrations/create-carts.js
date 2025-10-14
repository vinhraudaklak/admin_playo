export default {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("carts", {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			itemName: { type: Sequelize.STRING, allowNull: false },
			bookingDate: { type: Sequelize.DATEONLY, allowNull: false },
			startTime: { type: Sequelize.TIME, allowNull: false },
			basePrice: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
			currency: { type: Sequelize.STRING, defaultValue: "INR" },
			discountAmount: { type: Sequelize.DECIMAL(10, 2), defaultValue: 0 },
			totalAmount: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
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
		await queryInterface.dropTable("carts");
	},
};
