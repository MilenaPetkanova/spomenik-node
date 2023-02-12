import sequelizeConnection from '../db/connection'
import { DataTypes, Model } from 'sequelize'
import { LetterInterface } from '../interfaces/letter'

class Letter extends Model<LetterInterface> implements LetterInterface {
  id!: number;
  content!: string;
  date!: string;
}
Letter.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize: sequelizeConnection,
  modelName: 'Letter',
});

export default Letter