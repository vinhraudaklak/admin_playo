export default {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("venues", {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			sportId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: "sports", key: "id" },
				onDelete: "CASCADE",
			},
			ownerUserId: {
				type: Sequelize.UUID,
				allowNull: true,
				references: { model: "users", key: "id" },
				onDelete: "SET NULL",
			},
			address: { type: Sequelize.STRING, allowNull: false },
			position: Sequelize.GEOMETRY("POINT"),
			district: Sequelize.STRING,
			latitude: Sequelize.DECIMAL(10, 8),
			longitude: Sequelize.DECIMAL(11, 8),
			mapUrl: Sequelize.STRING,
			name: { type: Sequelize.STRING, allowNull: false },
			desShort: Sequelize.STRING,
			description: Sequelize.TEXT,
			contactPhone: Sequelize.STRING,
			contactName: Sequelize.STRING,
			pricePerHour: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
			stock: { type: Sequelize.INTEGER, defaultValue: 0 },
			imgUrl: Sequelize.JSON,
			timeActive: Sequelize.JSON,
			amenities: Sequelize.JSON,
			status: {
				type: Sequelize.ENUM("active", "inactive"),
				defaultValue: "active",
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
		await queryInterface.dropTable("venues");
	},
};
