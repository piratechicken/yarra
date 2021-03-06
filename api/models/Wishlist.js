const mongoose = require('./init')
const Schema = mongoose.Schema

const WishlistSchema = new Schema({
  // Has one/belongs to user
  user: { type: Schema.ObjectId, ref: 'User', unique: true },
  // Has many products
  products: [{ type: Schema.ObjectId, ref: 'Product' }]
})

const Wishlist = mongoose.model('Wishlist', WishlistSchema)

module.exports = Wishlist