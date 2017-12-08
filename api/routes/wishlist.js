const express = require('express')
const Wishlist = require('../models/Wishlist')
const { requireJWT } = require('../middleware/auth')

const router = new express.Router()

router.get('/wishlist', requireJWT, (req, res) => {
  Wishlist.findOne({ user: req.user })
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

module.exports = router 