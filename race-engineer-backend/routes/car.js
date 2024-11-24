const express = require("express");
const Car = require("../models/Car");

const router = express.Router();

// Get all cars
router.get("/", async (req, res) => {
  try {
    const cars = await Car.findAll();
    res.json(cars);
  } catch (err) {
    console.error("Error fetching cars:", err);
    res.status(500).json({ message: "Error fetching cars" });
  }
});

// Add a new car
router.post("/", async (req, res) => {
  const { make, model, category, image } = req.body;

  try {
    const newCar = await Car.create({ make, model, category, image });
    res.status(201).json(newCar);
  } catch (err) {
    console.error("Error adding car:", err);
    res.status(500).json({ message: "Error adding car" });
  }
});

// Update a car
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { make, model, category, image } = req.body;

  try {
    const car = await Car.findByPk(id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    await car.update({ make, model, category, image });
    res.json(car);
  } catch (err) {
    console.error("Error updating car:", err);
    res.status(500).json({ message: "Error updating car" });
  }
});

// Delete a car
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const car = await Car.findByPk(id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    await car.destroy();
    res.json({ message: "Car deleted successfully" });
  } catch (err) {
    console.error("Error deleting car:", err);
    res.status(500).json({ message: "Error deleting car" });
  }
});

module.exports = router;
