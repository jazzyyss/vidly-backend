const mongoose = require('mongoose');
const config = require('config');

module.exports = function () {
  //mongodb parameters
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);
  mongoose.set('useUnifiedTopology', true);
  //connect to database
  mongoose.connect(config.get('db'))
    .then(() => console.log(`Connected to MongoDB...${config.get('db')}`));
}