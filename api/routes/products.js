const express = require('express')
const Product = require('../models/Product')
const authMiddleware = require('../middleware/auth')

const router = new express.Router()

router.get('/products', authMiddleware.requireJWT, (req, res) => {
  Product.find()
    .then((products) => {
      res.json(products)
    })
    .catch((error) => { 
      res.json({ error: error.message })
    })
})

router.get('/products/:id', authMiddleware.requireJWT, (req, res) => {
  const id = req.params.id
  Product.find({
    _id: id
  })
    .then((product) => {
      res.json(product)
    })
    .catch((error) => { 
      res.json({ error: error.message })
    })
})


// brandName: req.body.brandName,
// name: req.body.name

router.post('/products', authMiddleware.requireJWT, (req, res) => {
  Product.create(req.body)
    .then((product) => {
      res.json(product)
    })
    .catch((error) => { 
      res.json({ error: error.message })
    })
})

router.patch('/products/:id', authMiddleware.requireJWT, (req, res) => {
  const id = req.params.id
  const attributes = req.body
  Product.findByIdAndUpdate(id, attributes, { new: true, runValidators: true })
    .then((product) => {
      res.json(product)
    })
    .catch((error) => { 
      res.json({ error: error.message })
    })
})

module.exports = router 