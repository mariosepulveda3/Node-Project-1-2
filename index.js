const express = require('express');
require('dotenv').config();
const db = require('./src/utils/database/db');
const indexRoutes = require('./src/api/index/index.routes');
const moviesRoutes = require('./src/api/movies/movies.routes');
const cinemaRoutes = require('./src/api/cinema/cinema.routes');

// Conecta a la base datos
db.connectDb();

// Crea el servidor
const PORT = process.env.PORT || 8080;
const DB_URL = process.env.DB_URL;

const server = express();
const router = express.Router();

// Por esto nos funciona req.body
server.use(express.json());
server.use(express.urlencoded({ extended: false }));


// Aquí tenemos las rutas
server.use("/", indexRoutes);
server.use("/movies", moviesRoutes);

// Arrancamos el servidor
server.listen(PORT, () => {
    console.log(`Serfivor funcionando correctamente en http://localhost:${PORT}`);
});