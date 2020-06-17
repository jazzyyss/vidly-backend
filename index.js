const genres = require('./routes/genres');
const customers = require('./routes/customers');
const express = require('express');
const app = express();

const mongoose = require('mongoose');
//setting up the mongoose
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
//connect to mongodb
mongoose.connect('mongodb://localhost:27017/vidly')
    .then(_ => console.log('connected'))
    .catch(err => console.log('could not connect to db'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));