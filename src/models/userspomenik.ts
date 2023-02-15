import {Model} from 'sequelize'
import { UserSpomenikInterface } from '../interfaces/userspomenik';

module.exports = (sequelize: any, DataTypes: any) => {
  class UserSpomenik extends Model<UserSpomenikInterface> implements UserSpomenikInterface {
    userId!: number;
    spomenikId!: number;
    isPrivate!: boolean;
  }
  UserSpomenik.init({
    userId: DataTypes.INTEGER,
    spomenikId: DataTypes.INTEGER,
    isPrivate: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'UserSpomenik',
  });
  return UserSpomenik;
};