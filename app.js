'use strict';

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
// const seeds = require('./bin/seeds.js');
// const Movies = require('./models/Movies.js');

const app = express();

mongoose.connect('mongodb://localhost/cinema', {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
});

// Movies.insertOne({ title: 'tiburon 5' }, { director: 'joe' }, { stars: ['billy'] }, { image: 'hola' }, { description: 'descripcion' },
// { showtimes: ['10:00', '22:00'] });

// Movies.insertMany(seeds)
//   .then(result => {
//     console.log('inserted');
//     mongoose.connection.close();
//   })
//   .catch(err => console.log('Error' + err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// app.use('/', indexRouter);
// -- 404 and error handler

// NOTE: requires a views/not-found.ejs template
app.use((req, res, next) => {
  res.status(404);
  res.render('not-found');
});

// NOTE: requires a views/error.ejs template
app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500);
    res.render('error');
  }
});

app.listen(3000, () => console.log('movies running on 3000'));
// module.exports = app;
