import sequelizeConnection from '../db/connection'
import { DataTypes, Model } from 'sequelize'
import { ImageInterface } from '../interfaces/image'

class Image extends Model<ImageInterface> implements ImageInterface {
  id!: number;
  src!: string;
  caption!: string;
  year!: number;
  location!: string;
}
Image.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  src: {
    type: DataTypes.STRING,
    allowNull: false
  },
  caption: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true
  },
}, {
  sequelize: sequelizeConnection,
  modelName: 'Image',
});

export default Image