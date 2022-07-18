import {Model} from 'sequelize';
import {ImageInterface} from '../interfaces/image'

module.exports = (sequelize: any, DataTypes: any) => {
  class Image extends Model<ImageInterface> implements ImageInterface {
    src!: string;
    caption!: string;
    year!: number;
    location!: string;
  }
  Image.init({
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
    sequelize,
    modelName: 'Image',
  });

  return Image;
};
