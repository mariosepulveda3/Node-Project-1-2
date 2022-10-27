const mongoose = require('mongoose');
const Movie = require('../../api/movies/movies.model');
const DB_URL = 'mongodb+srv://projectmovies:projectmovies@cluster0.wsn2uoj.mongodb.net/projectmovies?retryWrites=true&w=majority';
console.log(DB_URL);

const movies = [
    {
      title: 'The Matrix',
      director: 'Hermanas Wachowski',
      year: 1999,
      genre: 'Acción',
    },
    {
      title: 'The Matrix Reloaded',
      director: 'Hermanas Wachowski',
      year: 2003,
      genre: 'Acción',
    },
    {
      title: 'Buscando a Nemo',
      director: 'Andrew Stanton',
      year: 2003,
      genre: 'Animación',
    },
    {
      title: 'Buscando a Dory',
      director: 'Andrew Stanton',
      year: 2016,
      genre: 'Animación',
    },
    {
      title: 'Interestelar',
      director: 'Christopher Nolan',
      year: 2014,
      genre: 'Ciencia ficción',
    },
    {
      title: '50 primeras citas',
      director: 'Peter Segal',
      year: 2004,
      genre: 'Comedia romántica',
    },
  ];

  mongoose.connect(DB_URL)
  .then(async () => {
    const allMovies = await Movie.find().lean();
    
    if(!allMovies.length) {
      console.log('[seed]: No se encuentran peliculas')
    } else {
      console.log(`[seed]: Encontradas ${allMovies.length} peliculas.`);
      await Movie.collection.drop();
      console.log('[seed]: Pelicula eliminada correctamente');
    }
  })
  .catch((error) => console.log('[seed]: Error eliminando la película -->', error))
  .then(async() => {
    await Movie.insertMany(movies);
    console.log('[seed]: Nuevas peliculas añadidas con éxito');
  })
  .catch((error) => console.log('[seed]: Error añadiendo peliculas', error))
  .finally(() => mongoose.disconnect());
