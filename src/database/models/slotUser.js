import { DataTypes, Model } from 'sequelize';

class SlotUser extends Model {
  static associate(models) {
    SlotUser.belongsTo(models.VenueSlot, { foreignKey: 'slotId', as: 'slot' });
    SlotUser.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  }
}

export default (sequelize) => {
  SlotUser.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      slotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'venue_slots',
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
      role: {
        type: DataTypes.ENUM('member', 'default', 'guest'),
        defaultValue: 'default',
      },
    },
    {
      sequelize,
      modelName: 'SlotUser',
      tableName: 'slot_users',
      timestamps: true,
     
    }
  );
  return SlotUser;
};
