const express = require('express')
const Wishlist = require('../models/Wishlist')
const { requireJWT } = require('../middleware/auth')

const router = new express.Router()

router.get('/wishlist', requireJWT, (req, res) => {
  Wishlist.findOne({ user: req.user })
    .populate('products')
    .then((wishlist) => {
      if (wishlist) {
        res.json({ products: wishlist.products })
      }
      else {
        // If no wishlist return an empty array
        res.json({ products: [] })        
      }
    })
    .catch((error) => { 
      res.status(500).json({ error: error.message })
    })
})

router.post('/wishlist/products/:productID', requireJWT, (req, res) => {
  const { productID } = req.params
  Wishlist.findOneAndUpdate(
    { user: req.user }, 
    { $addToSet: { products: productID } }, // Checks if already exists and if not adds
    { upsert: true, new: true, runValidators: true } // Upsert: Update if exists, or else insert (create)
  )
    .populate('products')  
    .then((wishlist) => {
      res.json({ products: wishlist.products })
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
})

router.delete('/wishlist/products/:productID', requireJWT, (req, res) => {
  const { productID } = req.params
  Wishlist.findOneAndUpdate(
    { user: req.user }, 
    { $pull: { products: productID } }, // Checks if already exists and if not adds
    { upsert: true, new: true, runValidators: true } // Upsert: Update if exists, or else insert (create)
  )
    .populate('products')  
    .then((wishlist) => {
      res.json({ products: wishlist.products })
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
})

module.exports = router 