const bcrypt = require('bcrypt')
const Joi = require('joi')
const {User} = require('../models/users')
const express = require('express')
const router = express.Router()

router.post('/', async (req,res) => {
    const {Email, password} = req.body
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({Email:Email})
    if(!user) return res.status(400).send("User is not registered")

    const validPassword = await bcrypt.compare(password,user.password)
    if(!validPassword) return res.status(400).send("Invalid Password")
    const token = user.generateAuthToken()
    res.send(token)
})

function validate(user){
    const Schema = Joi.object({
        Email: Joi.string().min(0).max(2000).required(),
        password: Joi.number().required(),
    })
   return Schema.validate(user);
}
module.exports = router