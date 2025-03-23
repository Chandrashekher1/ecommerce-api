const admin = require('../middleware/admin')
const auth = require('../middleware/auth')
const {Products, validate} = require('../models/product')
const express = require('express')
const router = express.Router()


router.get('/', async (req,res) => {
    const product = await Products.find().sort('name')
    res.send(product)    
})

router.get('/:id', async (req,res) => {
    const result = await Products.findById(req.params.id)
    if(!result) return res.status(400).send("There is not any item with this id")

    res.send(result)
})

// post 
router.post('/', [auth,admin], async (req,res) => {
    const result = validate(req.body)
    if(result.error) {
        res.status(400).send(result.error.details[0].message)
    }
    let product = new Products({
        name : req.body.name,
        price: req.body.price,
        weight:req.body.weight,
        description:req.body.description
    })

    product = await product.save()
    res.send(product)
})

// update command
router.put('/:id',async (req,res) => {
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    const product = await Products.findByIdAndUpdate(req.params.id, 
        {
            name: req.body.name,
            price: req.body.price,
            weight: req.body.weight,
            description: req.body.description
        },
        {new: true}
    )
    if (!product) return res.status(404).send('The product with the given ID was not found.');
    res.send(product)
})

// Delete command
router.delete('/:id',[auth,admin], async (req,res) => {
    const deletedItem = await Products.findByIdAndDelete(req.params.id)
    if (!deletedItem) return res.status(404).send('The item with the given ID was not found.');
    res.send(deletedItem)
})


module.exports = router