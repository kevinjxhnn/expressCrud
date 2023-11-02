const { Sequelize } = require('sequelize');

// Database connection
const sequelize = new Sequelize({
  username: 'kevinjxhn',
  database: 'todos',
  password: 'rootuser',
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
});

module.exports = sequelize;
