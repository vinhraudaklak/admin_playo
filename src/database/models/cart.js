import { DataTypes, Model } from 'sequelize';

class Cart extends Model {
  static associate(models) {
    // Cart không có quan hệ với bảng khác trong schema hiện tại
  }
}

export default (sequelize) => {
  Cart.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      itemName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bookingDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      startTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      basePrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING,
        defaultValue: 'INR',
      },
      discountAmount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
      },
      totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Cart',
      tableName: 'carts',
      timestamps: true,
    }
  );
  return Cart;
};