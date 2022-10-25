const express = require('express');
require('dotenv').config();
const db = require('./src/utils/database/db');
const indexRoutes = require('./src/api/index/index.routes');
const moviesRoutes = require('./src/api/movies/movies.routes');
const cinemaRoutes = require('./src/api/cinema/cinema.routes');

const PORT = process.env.PORT || 8080;
const DB_URL = process.env.DB_URL;

const server = express();
const router = express.Router();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));


// aqui las rutas
server.use("/", indexRoutes);
server.use("/movies", moviesRoutes);

server.listen(PORT, () => {
    console.log(`Serfivor funcionando correctamente en http://localhost:${PORT}`);
});