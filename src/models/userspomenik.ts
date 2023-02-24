import {Model} from 'sequelize'
import { UserSpomenikInterface } from '../interfaces/userspomenik';

module.exports = (sequelize: any, DataTypes: any) => {
  class UserSpomenik extends Model<UserSpomenikInterface> implements UserSpomenikInterface {
    userId!: number;
    spomenikId!: number;
    isPrivate!: boolean;
  }
  UserSpomenik.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    spomenikId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isPrivate: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    }
  }, {
    sequelize,
    modelName: 'UserSpomenik',
  });
  return UserSpomenik;
};