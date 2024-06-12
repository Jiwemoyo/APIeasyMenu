const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    ingredients: [{
        name: {
            type: String,
            required: true,
        },
        quantity: {
            type: String,
            required: true,
        }
    }],
    steps: [{
        stepNumber: {
            type: Number,
            required: true,
        },
        instruction: {
            type: String,
            required: true,
        }
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema);
