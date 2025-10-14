import { DataTypes, Model } from "sequelize";

class Venue extends Model {
	static associate(models) {
		Venue.belongsTo(models.Sport, { foreignKey: "sportId", as: "sport" });
		Venue.belongsTo(models.User, {
			foreignKey: "ownerUserId",
			as: "owner",
		});
		Venue.hasMany(models.Booking, {
			foreignKey: "venueId",
			as: "bookings",
		});
		Venue.hasMany(models.VenueSlot, { foreignKey: "venueId", as: "slots" });
		Venue.hasMany(models.Review, { foreignKey: "venueId", as: "reviews" });
	}
}

export default (sequelize) => {
	Venue.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			sportId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "sports",
					key: "id",
				},
				onDelete: "CASCADE",
			},
			ownerUserId: {
				type: DataTypes.UUID,
				allowNull: true,
				references: {
					model: "users",
					key: "id",
				},
				onDelete: "SET NULL",
			},
			address: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			position: {
				type: DataTypes.GEOMETRY("POINT"),
				allowNull: true,
			},
			district: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			latitude: {
				type: DataTypes.DECIMAL(10, 8),
				allowNull: true,
			},
			longitude: {
				type: DataTypes.DECIMAL(11, 8),
				allowNull: true,
			},
			mapUrl: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			desShort: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			contactPhone: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			contactName: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			pricePerHour: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
			},
			stock: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
			imgUrl: {
				type: DataTypes.JSON,
				allowNull: true,
			},
			timeActive: {
				type: DataTypes.JSON,
				allowNull: true,
			},
			amenities: {
				type: DataTypes.JSON,
				allowNull: true,
			},
			status: {
				type: DataTypes.ENUM("active", "inactive"),
				defaultValue: "active",
			},
		},
		{
			sequelize,
			modelName: "Venue",
			tableName: "venues",
			timestamps: true,
		}
	);
	return Venue;
};
