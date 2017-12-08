import React from 'react'

const Wishlist = ({
  decodedToken,
  wishlist,
  onRemoveFromWishlist
}) => {
  return (
    <div className="product-list">
      <h3 className='mb-2'>Wishlist for { decodedToken.name }:</h3>
      {
        wishlist.map((product) => (
          <div className='product-item' key={product._id}>
            <p>{product.brandName}: {product.name}</p>
            <button 
              className="wishlist-button" 
              onClick={() => {onRemoveFromWishlist(product._id)}}
            >
              <span role="img" aria-label="remove from wishlist">❌</span>
            </button>
          </div>
        ))
      }
    </div>
  )
}

export default Wishlist

