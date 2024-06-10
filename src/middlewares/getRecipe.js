const Recipe = require('../models/recipeModel')

const getRecipe = async (req, res, next) => {
    let recipe;
    const { id } = req.params;
  
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({
        message: "El Id del libro no es valido",
      });
    }
    try {
      recipe = await Recipe.findById(id)
      if(!recipe){
          return res.status(404).json(
              {
                  message:'La receta no fue encontrada'
              }
          )
      }
    } catch (error) {
      return res.status(500).json(
          {
              message:error.message
          }
      )
    }
    res.recipe = recipe;
    next()
  };

  
  module.exports = getRecipe;