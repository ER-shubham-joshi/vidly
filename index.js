const config = require('config');
const Joi = require('joi');
Joi.objectId=require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const movies = require('./routes/movies');
const users = require('./routes/users');
const auth = require('./routes/auth');
const customers = require('./routes/customers');
const express = require('express');
const app = express();

if(!config.get('jwtPrivateKey')){
    console.log('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly')
    .then(()=> console.log('connected to mongo db....'))
    .catch(err=>console.error('could not conneted to mongodb...'));

app.use(express.json()); //middleware to take input from postman
app.use('/api/genres', genres); //routing
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));