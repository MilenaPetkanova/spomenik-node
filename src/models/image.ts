import {Model} from 'sequelize';
import {ImageInterface} from '../interfaces/image'

module.exports = (sequelize: any, DataTypes: any) => {
  class Image extends Model<ImageInterface> implements ImageInterface {
    src!: string;
    caption!: string;
    year!: number;
    location!: string;
    userId!: number;
    spomenikId!: number;
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    spomenikId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Image',
  });

  return Image;
};
