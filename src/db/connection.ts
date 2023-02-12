import { Sequelize } from 'sequelize'
import config from './config';

const sequelizeConnection = new Sequelize(config.database, config.user, config.password, config);
export default sequelizeConnection;