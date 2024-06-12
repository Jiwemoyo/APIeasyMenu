const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authenticateToken = require('../middlewares/authenticateToken');

router.post('/', authenticateToken, commentController.createComment);
router.get('/:recipeId', commentController.getCommentsByRecipe);
router.put('/:id', authenticateToken, commentController.updateComment);
router.delete('/:id', authenticateToken, commentController.deleteComment);

module.exports = router;
