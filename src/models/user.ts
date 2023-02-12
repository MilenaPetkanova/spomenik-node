import sequelizeConnection from '../db/connection'
import { DataTypes, Model } from 'sequelize'
import { UserInterface } from '../interfaces/user'

const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (user: any, options: object) {
  const SALT_FACTOR = 8
  if (!user.changed('password')) {
    return
  }
  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then((salt: any) => bcrypt.hashAsync(user.password, salt, null))
    .then((hash: any) => {
      user.setDataValue('password', hash)
    })
}

class User extends Model<UserInterface> implements UserInterface {
  id!: number;
  name!: string;
  role!: string;
  email!: string;
  password!: string;
  comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compareAsync(candidatePassword, this.password)
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin', 'editor', 'viewer'),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  hooks: {
    beforeCreate: hashPassword,
    beforeUpdate: hashPassword,
},
  sequelize: sequelizeConnection,
  modelName: 'User',
});

export default User;