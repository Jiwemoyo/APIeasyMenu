// recipeRoutes.js

const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const authenticateToken = require('../middlewares/authenticateToken');
const upload = require('../middlewares/upload');

router.post('/', authenticateToken, upload.single('image'), recipeController.createRecipe);
router.get('/', recipeController.getRecipes);
router.get('/user', authenticateToken, recipeController.getRecipesByUser);
router.get('/user/:userId', recipeController.getRecipesByUserId); // Nueva ruta
router.get('/:id', recipeController.getRecipeById);
router.put('/:id', authenticateToken, upload.single('image'), recipeController.updateRecipe);
router.delete('/:id', authenticateToken, recipeController.deleteRecipe);

module.exports = router;
