const express = require('express');
const Movie = require('./movies.model');

const router = express.Router();

//Endpoint, se comunica con otra red y puede hacer diferentes funciones CRUD

router.get('/', async(req, res) => {
    try {
      const allMovies = await Movie.find();
      return res.status(200).json(allMovies);
    } catch(error) {
      return res.status(500).json('Error en el servidor');
    }
});
  
router.get('/id/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const movieToFind = await Movie.findById(id);
      return res.status(200).json(movieToFind);
    } catch (error) {
      return res.status(500).json(error);
    }
});

router.get('/title/:title', async (req, res) => {
    try {
      const title = req.params.title;
      const allMovies = await Movie.find({title: title});
      return res.status(200).json(allMovies);
    } catch (error) {
      return res.status(500).json(error);
    }
});

router.get('/genre/:genre', async (req, res) => {
    try {
      const genre = req.params.genre;
      const allMovies = await Movie.find({genre: genre});
      return res.status(200).json(allMovies);
    } catch (error) {
      return res.status(500).json(error);
    }
});

router.get('/year/:year', async (req, res) => {
    try {
      const year = req.params.year;
      const allMovies = await Movie.find({year: {$gt:year}});
      return res.status(200).json(allMovies);
    } catch (error) {
      return res.status(500).json(error);
    }
});

router.post('/create', async (req, res) => {
    try {
        const movie = req.body;
        const newMovie = new Movie(movie);
        //.save --> Para guardarlo en la bd
        const created = await newMovie.save();
        return res.status(201).json(created);
    }   catch(error) {
        return res.status(500).json('Error al crear película');
    }
});

router.put('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const movieModify = new Movie(req.body);
        movieModify._id = id;
        const movieUpdated = await Movie.findByIdAndUpdate(id , movieModify);
        return res.status(201).json(movieUpdated);
    }   catch(error) {
        return res.status(500).json('Error al editar película');
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Movie.findByIdAndDelete(id);
        return res.status(200).json('Se ha conseguido eliminar la película correctamente');
    }   catch (error) {
        return res.status(500).json('No se ha conseguido eliminar la película');
    }
});


  module.exports = router;