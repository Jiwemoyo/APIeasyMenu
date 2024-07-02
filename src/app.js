const express = require('express');
const { config } = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/dbConfig');
const recipeRoutes = require('./routes/recipeRoutes');
const authRoutes = require('./routes/authRoutes');
const commentRoutes = require('./routes/commentRoutes')
const likeRoutes = require('./routes/likeRoutes');
const RestaurantRoutes = require('./routes/restaurantRoutes')
const adminRoutes = require('./routes/adminRoutes');
const cors = require('cors')
const path = require('path');

config();

//lo otro que falta es la conexion al servidor esa esta hecha en server.js
const app = express();
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(cors());

//Toto esto de conectar la base de datos esta hecho en el archivo config dentro de dbConfig.js
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/admin', adminRoutes); 
app.use('/api/restaurants',RestaurantRoutes)

module.exports = app;