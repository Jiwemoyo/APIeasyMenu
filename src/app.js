const express = require('express');
const { config } = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/dbConfig');
const recipeRoutes = require('./routes/recipeRoutes');
const authRoutes = require('./routes/authRoutes');
const commentRoutes = require('./routes/commentRoutes')

config();

//lo otro que falta es la conexion al servidor esa esta hecha en server.js
const app = express();
app.use(bodyParser.json());

//Toto esto de conectar la base de datos esta hecho en el archivo config dentro de dbConfig.js
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/comments', commentRoutes);

module.exports = app;