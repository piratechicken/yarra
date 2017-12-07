import React, { Component } from 'react';
import './App.css';
import SignInForm from './components/SignInForm'
import { signIn } from './api/auth'
import { listProducts } from './api/products'
// import { setToken } from './api/init'
import { getDecodedToken } from './api/token'

class App extends Component {
  state = {
    decodedToken: getDecodedToken() // Restore previous sign in data (if valid and not exp)
  }

  onSignIn = ({ email, password }) => {

    console.log('app received', { email, password })
    signIn({ email, password })
      .then((decodedToken) => {
        console.log('signed in', decodedToken)
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

  render() {
    const { decodedToken } = this.state
    return (
      <div className="App">
        <h1>Yarra</h1>
        <h2 className='mb-3'>Occasionally delivering 1 or 2 products</h2>
        {
          !!decodedToken ? (
            <div>
              <p>Email: { decodedToken.email }</p>
              <p>Signed in at: { new Date(decodedToken.iat *1000).toISOString() }</p>
              <p>Expire at: { new Date(decodedToken.exp *1000).toISOString() }</p>
            </div>
          ) : (     
            <SignInForm 
              onSignIn={ this.onSignIn }
            />
          )
        }
      </div>
    );
  }

  componentDidMount() {
    listProducts()
      .then((products) => {
        console.log(products)
      })
      .catch((error) => {
        console.error('error loading products', error)
      })
  }
}


export default App;
