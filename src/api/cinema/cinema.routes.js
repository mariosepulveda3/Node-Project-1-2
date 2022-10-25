const express = require('express');
const Cinema = require('./cinema.models');

const router = express.Router();

router.get('/', async(req, res) => {
    try {
      const allCinemas = await Cinema.find();
      return res.status(200).json(allCinemas);
    } catch(error) {
      return res.status(500).json('Error en el servidor');
    }
});

router.post('/create', async (req, res) => {
    try {
        const cinema = req.body;
        const newCinema = new Cinema(cinema);
        const created = await newCinema.save();
        return res.status(201).json(created);
    }   catch(error) {
        return res.status(500).json('Error al crear cinema');
    }
});

module.exports = router