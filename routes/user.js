const auth = require('../middleware/auth') // for authorization
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcrypt')
const {User,validate} = require('../models/users')
const express = require('express')
const router = express.Router()

router.get('/me',auth, async (req,res) => {
    const user = await User.findById(req.user._id).select('-password')
    res.send(user)
})

router.post('/',auth, async (req,res) => {
    const {FirstName, LastName,Email, password} = req.body
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    let user = await User.findOne({Email:Email})

    if(user) {
        return res.status(400).send("User is already exist")
    }
    user = new User({
        FirstName:FirstName,
        LastName: LastName,
        Email : Email,
        password : password
    })
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password,salt)
    user = await user.save()
    // if register then direct login in
    const token = user.generateAuthToken()    
    res.header('x-auth-token',token).send(user)
})

module.exports = router