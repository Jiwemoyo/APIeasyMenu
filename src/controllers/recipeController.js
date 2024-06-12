const Recipe = require('../models/recipeModel');

// Crear una nueva receta
exports.createRecipe = async (req, res) => {
    const { title, description, ingredients, steps } = req.body;
    try {
        const recipe = new Recipe({
            title,
            description,
            ingredients,
            steps,
            author: req.user.userId
        });
        await recipe.save();
        res.status(201).json(recipe);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todas las recetas
exports.getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().populate('author', 'username');
        res.status(200).json(recipes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener una receta por ID
exports.getRecipeById = async (req, res) => {
    const { id } = req.params;
    try {
        const recipe = await Recipe.findById(id).populate('author', 'username');
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
        res.status(200).json(recipe);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Actualizar una receta
exports.updateRecipe = async (req, res) => {
    const { id } = req.params;
    const { title, description, ingredients, steps } = req.body;
    try {
        const recipe = await Recipe.findById(id);
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });

        if (recipe.author.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        recipe.title = title || recipe.title;
        recipe.description = description || recipe.description;
        recipe.ingredients = ingredients || recipe.ingredients;
        recipe.steps = steps || recipe.steps;

        await recipe.save();
        res.status(200).json(recipe);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Borrar una receta
exports.deleteRecipe = async (req, res) => {
    const { id } = req.params;
    try {
        const recipe = await Recipe.findById(id);
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });

        if (recipe.author.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await recipe.remove();
        res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener recetas del usuario autenticado
exports.getRecipesByUser = async (req, res) => {
    try {
        const recipes = await Recipe.find({ author: req.user.userId }).populate('author', 'username');
        res.status(200).json(recipes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};