import api from './init'

export function listWishlist() {
  return api.get('/wishlist')
    .then((res) => res)
}

export function removeFromWishlist(productId) {
  return api.delete(`/wishlist/products/${productId}`)
    .then((res) => res)
}

export function addToWishlist(productId) {
  return api.post(`wishlist/products/${productId}`)
    .then((res) => res)
}