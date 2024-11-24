const { DataTypes } = require("sequelize");
const sequelize = require("../database"); // Import database connection

// Define the Car model
const Car = sequelize.define("Car", {
  make: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING, // Optional URL for the car image
    allowNull: true,
  },
});

module.exports = Car;
