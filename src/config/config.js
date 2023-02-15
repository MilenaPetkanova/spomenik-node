require('dotenv').config();
 
const env = process.env.NODE_ENV || 'development'; 

const config = {
  "development": {
    "user": process.env.DB_DEV_USER,
    "password": process.env.DB_DEV_PASSWORD,
    "database": process.env.DB_DEV_NAME,
    "dialect": process.env.DB_DEV_DIALECT,
    "host": process.env.DB_DEV_HOST,
    "port": process.env.DB_DEV_PORT,
    "serverPort": process.env.SERVER_DEV_PORT,
    "jwtAccessSecret": process.env.JWT_ACCESS_TOKEN_SECRET || '',
    "jwtRefreshSecret": process.env.JWT_REFRESH_TOKEN_SECRET || ''
  },
  "production": {
    "user": process.env.DB_PROD_USER,
    "password": process.env.DB_PROD_PASSWORD,
    "database": process.env.DB_PROD_NAME,
    "dialect": process.env.DB_PROD_DIALECT,
    "host": process.env.DB_PROD_HOST,
    "port": process.env.DB_PROD_PORT,
    "serverPort": process.env.SERVER_PROD_PORT,
    "jwtAccessSecret": process.env.JWT_ACCESS_TOKEN_SECRET || '',
    "jwtRefreshSecret": process.env.JWT_REFRESH_TOKEN_SECRET || ''
  },
}

module.exports = config[env];

