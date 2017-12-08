import React, { Fragment } from 'react'
import Product from './Product'

const ListProducts = ({
  products,
  editedProductID,
  onEditProduct,
  onAddToWishlist,
  renderEditForm
}) => {
  return (
    <div className='product-list'>
      <h3 className='mb-2'>Available products:</h3>
      {
        products.map((product) => (
          <Fragment key={ product._id }>
            <Product
              {...product}
              onAddToWishlist={ onAddToWishlist }
              onEdit={ () => {
                onEditProduct(product._id)
              } }
            />
            { editedProductID === product._id &&
              renderEditForm(product)
            }
          </Fragment>
        ))
      }
    </div>
  )
}

export default ListProducts