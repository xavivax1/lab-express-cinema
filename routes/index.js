const express = require('express');
const router = express.Router();
const Movies = require('../models/Movies');

/* GET home page. */
router.get('/movies', async (req, res, next) => {
  try {
    const movies = await Movies.find();
    res.render('movies', { movies });
  } catch (error) {
    next(error);
  }
});

router.get('/movie/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const movie = await Movies.findById(id);
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
