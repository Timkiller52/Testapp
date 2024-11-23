const express = require("express");
const Car = require("../models/Car");
const router = express.Router();

// Get all cars
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ message: "Error fetching cars" });
  }
});

// Add a new car
router.post("/", async (req, res) => {
  const { make, model, category, image } = req.body;

  try {
    const newCar = new Car({ make, model, category, image });
    await newCar.save();
    res.status(201).json(newCar);
  } catch (error) {
    console.error("Error adding car:", error);
    res.status(500).json({ message: "Error adding car" });
  }
});

// Update a car
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { make, model, category, image } = req.body;

  try {
    const updatedCar = await Car.findByIdAndUpdate(
      id,
      { make, model, category, image },
      { new: true }
    );
    if (!updatedCar) return res.status(404).json({ message: "Car not found" });

    res.json(updatedCar);
  } catch (error) {
    console.error("Error updating car:", error);
    res.status(500).json({ message: "Error updating car" });
  }
});

// Delete a car
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCar = await Car.findByIdAndDelete(id);
    if (!deletedCar) return res.status(404).json({ message: "Car not found" });

    res.json({ message: "Car deleted successfully" });
  } catch (error) {
    console.error("Error deleting car:", error);
    res.status(500).json({ message: "Error deleting car" });
  }
});

module.exports = router;
