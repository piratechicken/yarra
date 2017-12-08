import React from 'react'

function Product({
  brandName,
  name,
  _id,
  onEdit,
  onAddToWishlist
}) { 
  return (
    <div className='product-item'>
      <p onClick={ onEdit }>{ brandName }: { name }</p>
      <button 
        className="wishlist-button"
        onClick={()=>{onAddToWishlist(_id)}}
      >
        <span role="img" aria-label="add to wishlist">❤️</span>
      </button>
    </div>
  )
}

export default Product