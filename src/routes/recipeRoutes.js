const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipeModel");
const getRecipe = require("../middlewares/getRecipe");

//el midleware esta en la carpeta midelware pueden llamarlo solo usando getRecipe

//Obtener toas las recetas [GET ALL]

router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();

    console.log("GET ALL", recipes);

    if (recipes.length == 0) {
      return res.status(204).json([]);
    }
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Obtener una receta por medio del id

router.get("/:id", getRecipe, async (req, res) => {
  res.json(res.recipe);
});

//Crear Nueva receta [POST]

router.post("/", async (req, res) => {
  const {
    title,
    description,
    ingredients,
    instructions,
    image,
    author,
    likes,
  } = req?.body;
  if (
    !title ||
    !description ||
    !ingredients ||
    !instructions ||
    !image ||
    !author ||
    !likes
  ) {
    return res.status(400).json({
      message: "Todos los campos son obligatorios",
    });
  }

  const recipe = new Recipe({
    title,
    description,
    ingredients,
    instructions,
    image,
    author,
    likes,
  });

  try {
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Modificar una receta
router.put("/:id", getRecipe, async (req, res) => {
  try {
    const recipe = res.recipe;
    recipe.title = req.body.title || recipe.title;
    recipe.description = req.body.description || recipe.description;
    recipe.ingredients = req.body.ingredients || recipe.ingredients;
    recipe.instructions = req.body.instructions || recipe.instructions;
    recipe.image = req.body.image || recipe.image;
    recipe.author = req.body.author || recipe.author;
    recipe.likes = req.body.likes || recipe.likes;

    const updatedRecipe = await recipe.save();
    res.json(updatedRecipe);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

//patch es como el put pero este en ves de reescribir todo solo rescribe lo que se cambio
router.patch("/:id", getRecipe, async (req, res) => {
  if (
    !req.body.title &&
    !req.body.description &&
    !req.body.ingredients &&
    !req.body.instructions &&
    !req.body.image &&
    !req.body.author &&
    !req.body.likes
  ) {
    res.status(400).json({
      message: "Al menos un campo debe ser enviado!",
    });
  }
  try {
    const recipe = res.recipe;
    recipe.title = req.body.title || recipe.title;
    recipe.description = req.body.description || recipe.description;
    recipe.ingredients = req.body.ingredients || recipe.ingredients;
    recipe.instructions = req.body.instructions || recipe.instructions;
    recipe.image = req.body.image || recipe.image;
    recipe.author = req.body.author || recipe.author;
    recipe.likes = req.body.likes || recipe.likes;

    const updatedRecipe = await recipe.save();
    res.json(updatedRecipe);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

//El delete es para borrar un dato :D

router.delete("/:id", getRecipe, async (req, res) => {
  try {
    const recipe = res.recipe
    await recipe.deleteOne({
      _id:recipe._id
    })
    res.json({
      message: `La receta ${recipe.title} fue eliminada correctamente`
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
});

module.exports = router;
