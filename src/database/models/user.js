import { DataTypes, Model } from 'sequelize';

class User extends Model {
  static associate(models) {
    User.hasMany(models.Booking, { foreignKey: 'userId', as: 'bookings' });
    User.hasMany(models.Venue, { foreignKey: 'ownerUserId', as: 'venues' });
    User.hasMany(models.Review, { foreignKey: 'userId', as: 'reviews' });
    User.hasMany(models.Payment, { foreignKey: 'userId', as: 'payments' });
    User.hasMany(models.SlotUser, { foreignKey: 'userId', as: 'slotUsers' });
  }
}

export default (sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM('user', 'owner', 'admin'),
        defaultValue: 'user',
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
    
    }
  );
  return User;
};
  