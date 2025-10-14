import { DataTypes, Model } from 'sequelize';

class Booking extends Model {
  static associate(models) {
    Booking.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Booking.belongsTo(models.Venue, { foreignKey: 'venueId', as: 'venue' });
    Booking.belongsTo(models.VenueSlot, { foreignKey: 'slotId', as: 'slot' });
    Booking.belongsTo(models.Sport, { foreignKey: 'sportId', as: 'sport' });
    Booking.hasOne(models.Payment, { foreignKey: 'bookingId', as: 'payment' });
    Booking.hasOne(models.Review, { foreignKey: 'bookingId', as: 'review' });
  }
}

export default (sequelize) => {
  Booking.init(
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
          model: 'venues',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      slotId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'venue_slots',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      sportId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'sports',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      bookingDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      startTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
        defaultValue: 'pending',
      },
      hourly: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      ticketPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Booking',
      tableName: 'bookings',
      timestamps: true,
     
    }
  );
  return Booking;
};