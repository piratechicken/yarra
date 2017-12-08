import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import Welcome from './components/Welcome'
import SignInForm from './components/SignInForm'
import SignUp from './components/SignUp'
import ProductForm from './components/ProductForm'
import ListProducts from './components/ListProducts'
import Wishlist from './components/Wishlist'
import { signUp, signIn, signOutNow } from './api/auth'
import { listProducts, createProduct, updateProduct } from './api/products'
import { listWishlist, addToWishlist, removeFromWishlist } from './api/wishlist'
import { getDecodedToken } from './api/token'

class App extends Component {
  state = {
    decodedToken: getDecodedToken(), // Restore previous sign in data (if valid and not exp)
    products: [],
    editedProductID: null, // For viewing and editing an item
    newUser: false, // Whether to render sign in or sign up (toggles with button)
    showCreateProduct: true, // Whether to render create product (toggles with button)
    wishlist: [] // Whether to render sign in or sign up (toggles with button)
  }

  toggleNewUser = () => {
    this.setState({ newUser: !this.state.newUser })
  }

  onSignUp = ({ firstName, lastName, email, password }) => {
    signUp({ firstName, lastName, email, password })
      .then((decodedToken) => {
        this.setState({ decodedToken })
      })
    }

  onSignIn = ({ email, password }) => {
    signIn({ email, password })
      .then((decodedToken) => {
        // console.log('signed in', decodedToken)
        this.setState({ decodedToken })
        // const token = data.token
        // setToken(token)
        // listProducts()
        // .then((products) => {
        //   console.log(products)
        // })
        // .catch((error) => {
        //   console.error('error loading products', error)
        // })
      })
  }

  onSignOut = () => {
    signOutNow()
    this.setState({ decodedToken: null })
  }

  onCreateProduct = (productData) => {
    createProduct(productData)
      .then((newProduct) => {
        this.setState((prevState) => {
          // Append to existing products array
          const updatedProducts = prevState.products.concat(newProduct)
          return {
            products: updatedProducts
          }
        })
      })
  }

  onBeginEditingProduct = (newID) => {
    if (newID === this.state.editedProductID) {
      this.setState({ editedProductID: null })
    }
    else {
      this.setState({ editedProductID: newID })
    }
  }

  onUpdateEditedProduct = (productData) => {
    const { editedProductID } = this.state
    updateProduct(editedProductID, productData)
      .then((updatedProduct) => {
        this.setState((prevState) => {
          // Replace in existing products array
          const updatedProducts = prevState.products.map((product) => {
            if (product._id === updatedProduct._id) {
              return updatedProduct
            }
            else {
              return product
            }
          })
          return {
            products: updatedProducts,
            editedProductID: null,
          }
        })
      })
  }

  onRemoveFromWishlist = (productId) => {
    console.log('removing product:', productId)
    removeFromWishlist(productId)
      .then((updatedWishlist) => {
        this.setState((prevState) => {
          return({wishlist: updatedWishlist})
        })
      })
  }

  onAddToWishlist = (productId) => {
    console.log('adding', productId)
    addToWishlist(productId)
      .then((updatedWishlist) => {
        this.setState((prevState) => {
          return({wishlist: updatedWishlist})
        })
      })
  }

  toggleCreateNewProduct = () => {
    this.setState((prevState) => {
      const newShowCreateNewProduct = !prevState.showCreateProduct
      return({showCreateProduct: newShowCreateNewProduct})
    })
  }

  render() {
    const { decodedToken, products, newUser, showCreateProduct, editedProductID, wishlist } = this.state
    const signedIn = !!decodedToken

    return (
      <div className="App">
        <Header />
        {
          signedIn ? (
            <div>
              <Welcome 
                decodedToken = { decodedToken }
                onSignOut = { this.onSignOut }
              />
              <ListProducts
                products={ products }
                editedProductID={ editedProductID }
                onEditProduct={ this.onBeginEditingProduct }
                onAddToWishlist={ this.onAddToWishlist }
                renderEditForm={ (product) => (
                  <ProductForm
                    initialProduct={ product }
                    submitTitle='Update Product'
                    onSubmit={ this.onUpdateEditedProduct }
                  />
                )}
              />
              { showCreateProduct ? 
                  <ProductForm
                    submitTitle='Create Product'
                    onSubmit={ this.onCreateProduct }
                    showHeader={ true }
                    toggleCreateNewProduct={ this.toggleCreateNewProduct }
                  />
                : <div className="new-product-button-wrapper"><button className="new-product-button" onClick={this.toggleCreateNewProduct}>Create new product</button></div>
              }
              { (wishlist.length > 0) ? 
                  <Wishlist 
                    decodedToken={ decodedToken }  
                    wishlist={ wishlist }
                    onRemoveFromWishlist={ this.onRemoveFromWishlist }              
                  />
                  :
                  ''
              }
            </div>
          ) : ( 
            newUser ? (
              <SignUp 
                onSignUp={ this.onSignUp}
                toggleNewUser={ this.toggleNewUser }
              />

            ) : (
              <SignInForm 
                onSignIn={ this.onSignIn }
                toggleNewUser={ this.toggleNewUser }
                />
            )
          )
        }
      </div>
    );
  }

  load() {
    const { decodedToken } = this.state
    if (decodedToken) {
      listProducts()
        .then((products) => {
          this.setState({ products })
          // console.log(products)
          
        })
        .catch((error) => {
          console.error('error loading products', error)
        })
      listWishlist()
        .then((list) => {
          this.setState({ wishlist: list.data.products })
        })
        .catch((error) => {
          console.error('error loading products', error)
        })

    }
    else {
      this.setState({
        products: null
      })
    }
  }

  // When this App first appears on screen
  componentDidMount() {
    this.load()
  }

  // When state changes
  componentDidUpdate(prevProps, prevState) {
    // If just signed in, signed up, or signed out,
    // then the token will have changed
    if (this.state.decodedToken !== prevState.decodedToken) {
      this.load()
    }
    if (this.state.wishlist !== prevState.wishlist) {
      this.load()
    }
  }
}


export default App;
