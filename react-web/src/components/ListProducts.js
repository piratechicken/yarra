import React from 'react'

const ListProducts = ({
  products
}) => {
  return (
    <div className='product-list'>
      <h3 className='mb-2'>Available products:</h3>
      <ul>
      { 
        products.map((product) => {
          return (
            <li key={ product._id }>
              { product.brandName }: { product.name }
            </li>
          )
        })
      }
      </ul>
    </div>
  )
}

export default ListProducts