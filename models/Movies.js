'use strict';
const mongoose = require('mongoose');
const seeds = require('../bin/seeds.js');

const Schema = mongoose.Schema;

const movieSchema = new Schema({

  title: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  stars: {
    type: [String],
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  showTimes: {
    type: [String],
    required: true
  }
});

const Movies = mongoose.model('Movies', movieSchema);

mongoose.connect('mongodb://localhost/cinema', {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
});

// Movies.insertOne({ title: 'tiburon 5' }, { director: 'joe' }, { stars: ['billy'] }, { image: 'hola' }, { description: 'descripcion' },
// { showtimes: ['10:00', '22:00'] });
// mongoose.connection.collections['Movies'].drop( (err => {
//   console.log('collection dropped');
// });

// mongoose.connection.db.dropDatabase();
// mongoose.connection.cinema.dropDatabase();

Movies.insertMany(seeds)
  .then(result => {
    console.log('inserted');
    mongoose.connection.close();
  })
  .catch(err => console.log('Error' + err));

// module.export = Movies;
