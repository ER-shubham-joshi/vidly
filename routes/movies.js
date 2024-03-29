const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const { Genre } = require('../models/genre');
const { Movie, validate } = require('../models/movie');

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('title');
    res.send(movies);
});

router.post('/',auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');

    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    await movie.save();
    res.send(movie);
});

module.exports = router;