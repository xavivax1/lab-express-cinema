const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

/* GET home page. */
router.get('/movies', async (req, res, next) => {
  try {
    const movies = await Movie.find();
    res.render('movies', { movies });
  } catch (error) {
    next(error);
  }
});

router.get('/detail/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    console.log(movie);
    res.render('detail', movie);
  } catch (error) {
    next(error);
  }
});

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
