const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config(); 

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST, // Database host
    dialect: 'postgres', // Database dialect
    port: process.env.DB_PORT, 
  }
);

// Test the database connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error('Error: ' + err));

// Define and associate models
const Item = require('./item')(sequelize, DataTypes);

// Export the Sequelize instance and models
module.exports = {
  sequelize,
  Item
};
