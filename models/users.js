const mongoose = require('mongoose')
const Joi = require('joi')
const Schema = mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
        maxlength:255,
        lowercase: true
    },
    LastName: {
        type: String,
        maxlength:255,
        lowercase: true
    },
    Email: {
        type:String,
        required:true,
        unique:true,
        validate: function(value){
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        },
        message: 'Invalid email format'
    },
    password: {
        type : String,
        required: true,
        minlength:5,
        maxlength: 1024
    }
})

const User = mongoose.model('user',Schema)

function validateProduct(user){
    const Schema = Joi.object({
        FirstName: Joi.string().min(3).max(255).required(),
        LastName: Joi.string().min(3).max(255).required(),
        Email: Joi.string().min(0).max(2000).required(),
        password: Joi.number().required(),
    })
   return Schema.validate(user);
}

module.exports.User = User
module.exports.validate = validateProduct