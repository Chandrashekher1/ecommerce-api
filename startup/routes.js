const auth = require('../routes/auth')
const products = require('../routes/products')
const users = require('../routes/user')
const express = require('express')

module.exports = function (app){
    app.use(express.json())
    app.use('/api/products', products)
    app.use('/api/users', users)
    app.use('/api/auth', auth)
}
