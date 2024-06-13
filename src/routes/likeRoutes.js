const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');
const authenticateToken = require('../middlewares/authenticateToken');

router.post('/', authenticateToken, likeController.likeRecipe);
router.delete('/', authenticateToken, likeController.unlikeRecipe);
router.get('/:recipeId', likeController.getLikesByRecipe);

module.exports = router;
