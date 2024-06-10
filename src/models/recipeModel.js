const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    title: String,
    description:String,
    ingredients: String,
    instructions: String,
    image:  String,
    author: String,
    likes: String,
})

module.exports = mongoose.model('Recipe',recipeSchema)