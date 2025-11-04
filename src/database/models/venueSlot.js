import { DataTypes, Model } from "sequelize";

class VenueSlot extends Model {
	static associate(models) {
		// ✅ Mỗi slot thuộc về 1 sân
		VenueSlot.belongsTo(models.Venue, {
			foreignKey: "venueId",
			as: "venue",
		});

		// ✅ Mỗi slot có thể gắn với 1 môn thể thao
		VenueSlot.belongsTo(models.Sport, {
			foreignKey: "sportId",
			as: "sport",
		});

		// ✅ Mỗi slot có thể có nhiều booking
		VenueSlot.hasMany(models.Booking, {
			foreignKey: "slotId",
			as: "bookings",
		});

		// ✅ Mỗi slot có thể có nhiều người tham gia
		VenueSlot.hasMany(models.SlotUser, {
			foreignKey: "slotId",
			as: "slotUsers", // chỉ cần alias này là đủ
			onDelete: "CASCADE",
			hooks: true,
		});
	}
}

export default (sequelize) => {
	VenueSlot.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			venueId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "venues",
					key: "id",
				},
				onDelete: "CASCADE",
			},
			sportId: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: "sports",
					key: "id",
				},
				onDelete: "SET NULL",
			},
			level: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			date: {
				type: DataTypes.DATEONLY,
				allowNull: true,
			},
			startTime: {
				type: DataTypes.TIME,
				allowNull: true,
			},
			endTime: {
				type: DataTypes.TIME,
				allowNull: true,
			},
			isAvailable: {
				type: DataTypes.BOOLEAN,
				defaultValue: true,
			},
		},
		{
			sequelize,
			modelName: "VenueSlot",
			tableName: "venue_slots",
			timestamps: true,
		}
	);
	return VenueSlot;
};
