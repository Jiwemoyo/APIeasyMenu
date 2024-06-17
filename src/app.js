import  express from 'express.js'
import { config } from 'dotenv.js';
import bodyParser from 'body-parser.js';
import  connectDB from './config/dbConfig.js';
import  recipeRoutes from './routes/recipeRoutes.js';
const mongoose = require("mongoose")

//importar para el typo modulo
const commentRoutes = require("./routes/commentRoutes.js")
config();

//lo otro que falta es la conexion al servidor esa esta hecha en server.js
const app = express();
app.use(bodyParser.json());

//conectar la base
mongoose.connect(process.env.MONGO_URL,{dbName: process.env.MONGO_DB_NAME})
const db = mongoose.connection;

app.use("/comment", commentRoutes)
//Toto esto de conectar la base de datos esta hecho en el archivo config dentro de dbConfig.js
connectDB();

app.use('/recipes', recipeRoutes);

module.exports = app;