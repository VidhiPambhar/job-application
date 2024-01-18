const Sequelize = require("sequelize")

const sequelize = new Sequelize(
  'job_application',
  'root',
  'root',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);

module.exports = sequelize;
