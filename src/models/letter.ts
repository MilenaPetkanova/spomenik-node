import {Model} from 'sequelize';
import {LetterInterface} from '../interfaces/letter'

module.exports = (sequelize: any, DataTypes: any) => {
  class Letter extends Model<LetterInterface> implements LetterInterface {
    content!: string;
  }
  Letter.init({
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Letter',
  });

  return Letter;
};
