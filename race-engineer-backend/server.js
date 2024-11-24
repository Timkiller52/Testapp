const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./database"); // SQLite database connection
const carRoutes = require("./routes/car"); // Car routes
const authRoutes = require("./routes/auth"); // Auth routes

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test SQLite connection
sequelize
  .authenticate()
  .then(() => console.log("Connected to SQLite database"))
  .catch((err) => console.error("Unable to connect to SQLite:", err));

// Sync the database models
sequelize.sync({ force: false }).then(() => {
  console.log("Database synced successfully");
});

// Routes
app.use("/auth", authRoutes); // Add auth routes
app.use("/cars", carRoutes); // Car-related routes

// Default route
app.get("/", (req, res) => {
  res.send("Race Engineer Backend is Running!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
