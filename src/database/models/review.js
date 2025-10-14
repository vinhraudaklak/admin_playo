import { DataTypes, Model } from 'sequelize';

class Review extends Model {
  static associate(models) {
    Review.belongsTo(models.Booking, { foreignKey: 'bookingId', as: 'booking' });
    Review.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Review.belongsTo(models.Venue, { foreignKey: 'venueId', as: 'venue' });
  }
}

export default (sequelize) => {
  Review.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      bookingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'bookings',
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
      venueId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'venues',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Review',
      tableName: 'reviews',
      timestamps: true,
     
    }
  );
  return Review;
};