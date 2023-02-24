import {Model} from 'sequelize';
import {LetterInterface} from '../interfaces/letter'

module.exports = (sequelize: any, DataTypes: any) => {
  class Letter extends Model<LetterInterface> implements LetterInterface {
    content!: string;
    date!: string;
    userId!: number;
    spomenikId!: number;
  }
  Letter.init({
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isDate: true,
      }
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
    modelName: 'Letter',
  });

  return Letter;
};
