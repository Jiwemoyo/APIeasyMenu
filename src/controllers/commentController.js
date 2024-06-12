const Comment = require('../models/comentModel');
const Recipe = require('../models/recipeModel');

// Crear un nuevo comentario
exports.createComment = async (req, res) => {
    const { content, recipeId } = req.body;
    try {
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });

        const comment = new Comment({
            content,
            author: req.user.userId,
            recipe: recipeId
        });

        await comment.save();

        recipe.comments.push(comment._id);
        await recipe.save();

        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todos los comentarios de una receta
exports.getCommentsByRecipe = async (req, res) => {
    const { recipeId } = req.params;
    try {
        const comments = await Comment.find({ recipe: recipeId }).populate('author', 'username');
        res.status(200).json(comments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Actualizar un comentario
exports.updateComment = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
        const comment = await Comment.findById(id);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });

        if (comment.author.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        comment.content = content || comment.content;

        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Borrar un comentario
exports.deleteComment = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await Comment.findById(id);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });

        if (comment.author.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await comment.remove();

        const recipe = await Recipe.findById(comment.recipe);
        recipe.comments.pull(comment._id);
        await recipe.save();

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
