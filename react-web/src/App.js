import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import Welcome from './components/Welcome'
import SignInForm from './components/SignInForm'
import SignUp from './components/SignUp'
import ListProducts from './components/ListProducts'
import { signUp, signIn, signOutNow } from './api/auth'
import { listProducts } from './api/products'
// import { setToken } from './api/init'
import { getDecodedToken } from './api/token'

class App extends Component {
  state = {
    decodedToken: getDecodedToken(), // Restore previous sign in data (if valid and not exp)
    products: [],
    activeProductId: null, // For viewing and editing an item
    newUser: false // Whether to render sign in or sign up (toggles with button)
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



  render() {
    const { decodedToken, products, newUser } = this.state
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
              />
            </div>
          ) : ( 
            newUser ? (
              <SignUp 
                onSignUp = { this.onSignUp}
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

  componentDidMount() {
    listProducts()
      .then((products) => {
        this.setState({
          products: products
        })
      })
      .catch((error) => {
        console.error('error loading products', error)
      })
  }
}


export default App;
