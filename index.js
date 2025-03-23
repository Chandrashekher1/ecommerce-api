const config = require('config')
const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('dotenv').config()
require('./startup/routes')(app)

if(!process.env.shop_jwtPrivateKey) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.')
    process.exit(1)
}

mongoose.connect("mongodb://localhost/products", {useUnifiedTopology: true,

    useNewUrlParser: true,})
    .then(() => console.log('MongoDB is connected...'))
    .catch(err => console.error('Could not connect to MongoDB:', err.message));

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
