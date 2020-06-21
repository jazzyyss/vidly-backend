const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function () {
  //mongodb parameters
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);
  mongoose.set('useUnifiedTopology', true);
  //connect to database
  mongoose.connect('mongodb://localhost:27017/vidly')
    .then(() => winston.log('info', 'Connected to MongoDB...'));
}