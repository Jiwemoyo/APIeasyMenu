const Recipe = require('../models/recipeModel');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { uploadImageToFirebase, deleteImageFromFirebase } = require('../utils/firebaseUpload.js');
// Crear una nueva receta
exports.createRecipe = async (req, res) => {
    try {
        const { title, description, ingredients, steps } = req.body;
        let imageUrl = null;
        let imageFileName = null;

        if (req.file) {
            const uploadResult = await uploadImageToFirebase(req.file);
            imageUrl = uploadResult.downloadURL;
            imageFileName = uploadResult.fileName;
        }

        const recipe = new Recipe({
            title,
            description,
            ingredients: Array.isArray(ingredients) ? ingredients : ingredients.split(',').map(item => item.trim()).filter(Boolean),
            steps: Array.isArray(steps) ? steps : steps.split(',').map(item => item.trim()).filter(Boolean),
            author: req.user.userId,
            image: imageUrl,
            imageFileName: imageFileName
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
        const recipes = await Recipe.find()
            .populate('author', 'username')
            .populate({ 
                path: 'likes', 
                select: '_id' 
            });
        const recipesWithLikes = recipes.map(recipe => ({
            ...recipe._doc,
            likesCount: recipe.likes.length
        }));
        res.status(200).json(recipesWithLikes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener una receta por ID
exports.getRecipeById = async (req, res) => {
    const { id } = req.params;
    try {
        const recipe = await Recipe.findById(id)
            .populate('author', 'username') // Populate para el autor
            .populate({ 
                path: 'comments',
                populate: { path: 'author', select: 'username' } // Populate para comentarios
            })
            .populate('likes'); // Populate para likes, si es necesario
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
    let newImageUrl = null;
    let newImageFileName = null;

    try {
        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return res.status(404).json({ message: "Receta no encontrada" });
        }

        if (recipe.author.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        if (req.file) {
            const uploadResult = await uploadImageToFirebase(req.file);
            newImageUrl = uploadResult.downloadURL;
            newImageFileName = uploadResult.fileName;

            if (recipe.imageFileName) {
                await deleteImageFromFirebase(recipe.imageFileName);
            }
        }

        const updatedRecipe = await Recipe.findByIdAndUpdate(id, {
            title,
            description,
            ingredients: Array.isArray(ingredients) ? ingredients : ingredients.split(',').map(item => item.trim()).filter(Boolean),
            steps: Array.isArray(steps) ? steps : steps.split(',').map(item => item.trim()).filter(Boolean),
            image: newImageUrl || recipe.image,
            imageFileName: newImageFileName || recipe.imageFileName,
            author: req.user.userId
        }, { new: true });

        res.status(200).json(updatedRecipe);
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

        if (recipe.imageFileName) {
            await deleteImageFromFirebase(recipe.imageFileName);
        }

        await recipe.deleteOne();
        res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener recetas del usuario autenticado
// Obtener recetas del usuario autenticado
exports.getRecipesByUser = async (req, res) => {
    try {
        const recipes = await Recipe.find({ author: req.user.userId })
            .populate('author', 'username')
            .populate({
                path: 'comments',
                populate: {
                    path: 'author',
                    select: 'username'
                }
            });
        res.status(200).json(recipes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// recipeController.js

exports.getRecipesByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const recipes = await Recipe.find({ author: userId })
            .populate('author', 'username')
            .populate({
                path: 'comments',
                populate: {
                    path: 'author',
                    select: 'username'
                }
            });
        res.status(200).json(recipes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
