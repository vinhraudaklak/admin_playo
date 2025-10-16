import { DataTypes, Model } from "sequelize";

class RefreshToken extends Model {
	static associate(models) {
		// Mỗi RefreshToken thuộc về 1 User
		RefreshToken.belongsTo(models.User, {
			foreignKey: "userId",
			as: "user",
		});
	}
}

export default (sequelize) => {
	RefreshToken.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			token: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			expiryDate: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "users", // tên bảng (tableName) trong model User
					key: "id",
				},
				onDelete: "CASCADE",
			},
		},
		{
			sequelize,
			modelName: "RefreshToken",
			tableName: "refresh_tokens",
			timestamps: true,
		}
	);

	return RefreshToken;
};
