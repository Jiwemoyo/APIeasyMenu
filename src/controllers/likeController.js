const Like = require('../models/likeModel');
const Recipe = require('../models/recipeModel');

// Dar like a una receta
exports.likeRecipe = async (req, res) => {
    const { recipeId } = req.body;
    try {
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });

        const existingLike = await Like.findOne({ user: req.user.userId, recipe: recipeId });
        if (existingLike) return res.status(400).json({ message: 'You have already liked this recipe' });

        const like = new Like({
            user: req.user.userId,
            recipe: recipeId
        });

        await like.save();
        recipe.likes.push(like._id);
        await recipe.save();

        res.status(201).json(like);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Quitar like de una receta
exports.unlikeRecipe = async (req, res) => {
    const { recipeId } = req.body;
    try {
        const like = await Like.findOne({ user: req.user.userId, recipe: recipeId });
        if (!like) return res.status(404).json({ message: 'Like not found' });

        await like.deleteOne();
        const recipe = await Recipe.findById(recipeId);
        recipe.likes.pull(like._id);
        await recipe.save();

        res.status(200).json({ message: 'Like removed successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener likes de una receta
exports.getLikesByRecipe = async (req, res) => {
    const { recipeId } = req.params;
    try {
        const likes = await Like.find({ recipe: recipeId }).populate('user', 'username');
        res.status(200).json(likes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//obtener la cantidad de likes por receta
exports.getLikesCountByRecipe = async (req, res) => {
    const { recipeId } = req.params;
    try {
        const likesCount = await Like.countDocuments({ recipe: recipeId });
        res.status(200).json({ count: likesCount });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
