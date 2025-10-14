import { DataTypes, Model } from 'sequelize';

class Sport extends Model {
  static associate(models) {
    Sport.hasMany(models.Venue, { foreignKey: 'sportId', as: 'venues' });
    Sport.hasMany(models.Booking, { foreignKey: 'sportId', as: 'bookings' });
    Sport.hasMany(models.VenueSlot, { foreignKey: 'sportId', as: 'slots' });
  }
}

export default (sequelize) => {
  Sport.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      iconUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Sport',
      tableName: 'sports',
      timestamps: true,
    
    }
  );
  return Sport;
};