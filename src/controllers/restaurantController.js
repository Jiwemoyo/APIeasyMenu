const Restaurant = require('../models/Restaurant');

exports.createRestaurant = async (req, res) => {
  try {
    const { name, locationUrl } = req.body;
    const restaurant = new Restaurant({
      name,
      locationUrl,
      userId: req.user.userId
    });
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getRestaurantsByUser = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ userId: req.user.userId });
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateRestaurant = async (req, res) => {
  try {
    const { name, locationUrl } = req.body;
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      { name, locationUrl },
      { new: true }
    );
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteRestaurant = async (req, res) => {
  try {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
