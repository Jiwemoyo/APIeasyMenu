const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const authenticateToken = require('../middlewares/authenticateToken');

router.post('/', authenticateToken, restaurantController.createRestaurant);
router.get('/', authenticateToken, restaurantController.getRestaurantsByUser);
router.put('/:id', authenticateToken, restaurantController.updateRestaurant);
router.delete('/:id', authenticateToken, restaurantController.deleteRestaurant);

module.exports = router;
