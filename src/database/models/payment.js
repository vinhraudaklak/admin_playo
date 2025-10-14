import { DataTypes, Model } from 'sequelize';

class Payment extends Model {
  static associate(models) {
    Payment.belongsTo(models.Booking, { foreignKey: 'bookingId', as: 'booking' });
    Payment.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  }
}

export default (sequelize) => {
  Payment.init(
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
      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('pending', 'complete', 'failed'),
        defaultValue: 'pending',
      },
      transactionId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Payment',
      tableName: 'payments',
      timestamps: true,
     
    }
  );
  return Payment;
};
