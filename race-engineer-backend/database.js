const { Sequelize } = require("sequelize");

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite", // Path to SQLite file
});

sequelize
  .authenticate()
  .then(() => console.log("Connected to SQLite database"))
  .catch((err) => console.error("Unable to connect to SQLite:", err));

module.exports = sequelize;
