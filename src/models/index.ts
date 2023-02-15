const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require(path.join(__dirname, '..', 'config', 'config.js'));
const db: any = {};

const sequelize = new Sequelize(config.database, config.user, config.password, config);

fs
  .readdirSync(__dirname)
  .filter((file: string) => {
    return file !== 'index.ts' && file !== 'index.js';
  })
  .forEach((file: any) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
