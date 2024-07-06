const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Recipe = require('../models/recipeModel'); // Asegúrate de que la ruta es correcta
const Comment = require('../models/comentModel'); // Asegúrate de que la ruta es correcta
const Like = require('../models/likeModel'); // Asegúrate de que la ruta es correcta
const Restaurant = require('../models/Restaurant'); // Asegúrate de que la ruta es correcta

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Middleware para borrado en cascada
userSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
    try {
        await Recipe.deleteMany({ author: this._id });
        await Comment.deleteMany({ author: this._id });
        await Like.deleteMany({ user: this._id });
        await Restaurant.deleteMany({ userId: this._id });
        next();
    } catch (error) {
        next(error);
    }
});
module.exports = mongoose.model('User', userSchema);
