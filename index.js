const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('dotenv').config()
require('./startup/routes')(app)

mongoose.connect(process.env.MONGODB_CONNECT_URI, {useUnifiedTopology: true,

    useNewUrlParser: true,})
    .then(() => console.log('MongoDB is connected...'))
    .catch(err => console.error('Could not connect to MongoDB:', err.message));

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
