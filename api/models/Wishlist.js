const mongoose = require('./init')
const Schema = mongoose.Schema

const WishlistSchema = new Schema ('Wishlist', {
  // Has one/belongs to user
  user: { type: Schema.ObjectId, ref: 'User', unique: true },
  // Has many products
  product: [{ type: Schema.ObjectId, ref: 'Product' }]
})

const Wishlist = mongoose.model('Wishlist', WishlistSchema)

module.exports = Wishlist