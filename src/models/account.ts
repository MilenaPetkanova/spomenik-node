import sequelizeConnection from '../db/connection'
import { DataTypes, Model } from 'sequelize'
import { AccountInterface } from '../interfaces/account'

class Account extends Model<AccountInterface> implements AccountInterface {
  id!: number;
  name!: string;
  private!: boolean;
}

Account.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  private: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
}, {
  sequelize: sequelizeConnection,
  modelName: 'Account',
});

export default Account