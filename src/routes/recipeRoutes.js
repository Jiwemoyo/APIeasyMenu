const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const authenticateToken = require('../middlewares/authenticateToken');

router.post('/', authenticateToken, recipeController.createRecipe);
router.get('/', recipeController.getRecipes);
router.get('/user', authenticateToken, recipeController.getRecipesByUser); // Nueva ruta para recetas del usuario
router.get('/:id', recipeController.getRecipeById);
router.put('/:id', authenticateToken, recipeController.updateRecipe);
router.delete('/:id', authenticateToken, recipeController.deleteRecipe);

module.exports = router;
