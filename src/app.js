import  express from 'express.js'
import { config } from 'dotenv.js';
import bodyParser from 'body-parser.js';
import  connectDB from './config/dbConfig.js';
import  recipeRoutes from './routes/recipeRoutes.js';

//importar para el typo modulo

config();

//lo otro que falta es la conexion al servidor esa esta hecha en server.js
const app = express();
app.use(bodyParser.json());

//Toto esto de conectar la base de datos esta hecho en el archivo config dentro de dbConfig.js
connectDB();

app.use('/recipes', recipeRoutes);

module.exports = app;