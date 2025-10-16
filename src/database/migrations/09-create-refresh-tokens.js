export async function up(queryInterface, Sequelize) {
	await queryInterface.createTable("refresh_tokens", {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		token: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		expiryDate: {
			type: Sequelize.DATE,
			allowNull: false,
		},
		userId: {
			type: Sequelize.UUID,
			allowNull: false,
			references: {
				model: "users", // Tên bảng users
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "CASCADE",
		},
		createdAt: {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
		},
		updatedAt: {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
		},
	});
}

export async function down(queryInterface, Sequelize) {
	await queryInterface.dropTable("refresh_tokens");
}
