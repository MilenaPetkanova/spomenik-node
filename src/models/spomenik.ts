import {Model} from 'sequelize';
import {SpomenikInterface} from '../interfaces/spomenik'

module.exports = (sequelize: any, DataTypes: any) => {
  class Spomenik extends Model<SpomenikInterface> implements SpomenikInterface {
    name!: string;
  }
  Spomenik.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Spomenik',
  });
  return Spomenik;
};