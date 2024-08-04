const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file

// Create a new Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name
  process.env.DB_USER, // Database username
  process.env.DB_PASSWORD, // Database password
  {
    host: process.env.DB_HOST, // Database host
    dialect: 'postgres', // Database dialect
    port: process.env.DB_PORT, // Database port
  }
);

// Test the database connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error('Error: ' + err));

// Define and associate models
const User = require('./user')(sequelize, DataTypes);

// Export the Sequelize instance and models
module.exports = {
  sequelize,
  User
};
