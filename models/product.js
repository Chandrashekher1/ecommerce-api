const mongoose = require('mongoose')
const Joi = require('joi')

const Schema = new mongoose.Schema({
    name:{
        type: String,
        required : true,
        maxlength : 255,
        lowercase: true
    },
    price: {
        type: Number,
        required : function() {return this.name},
        min: 10,
        max: 2000,
        get: v => Math.round(v),
        set: v => Math.round(v)
    },
    weight: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    }
})

const Product = mongoose.model('milk',Schema)

function validateProduct(product){
    const Schema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        price: Joi.number().min(0).max(2000).required(),
        weight: Joi.number().required(),
        description: Joi.string().required()
    })
   return Schema.validate(product);
}

module.exports.Products = Product
module.exports.validate = validateProduct