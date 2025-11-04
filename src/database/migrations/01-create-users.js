export default {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("users", {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			name: { type: Sequelize.STRING, allowNull: false },
			email: { type: Sequelize.STRING, allowNull: false, unique: true },
			password: { type: Sequelize.STRING, allowNull: false },
			phone: Sequelize.STRING,
			address: Sequelize.STRING,
			dateOfBirth: Sequelize.DATEONLY,
			avatar: Sequelize.STRING,
			role: {
				type: Sequelize.ENUM("user", "owner", "admin"),
				defaultValue: "user",
			},
			resetPasswordToken: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			resetPasswordExpires: {
				type: Sequelize.DATE,
				allowNull: true,
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
		await queryInterface.dropTable("users");
	},
};
