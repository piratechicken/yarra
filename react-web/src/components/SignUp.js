import React from 'react'

const SignUp = ({ 
  onSignUp,
  toggleNewUser 
}) => {
  return(
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault() // Prevent old way of form submission
          const firstName = event.target.elements.firstName.value
          const lastName = event.target.elements.lastName.value
          const email = event.target.elements.email.value
          const password = event.target.elements.password.value
          onSignUp({ firstName, lastName, email, password })
        }}
      >
        <label className='mb-2'>
          { 'First name: ' }
          <input type = 'text' name = 'firstName' />
        </label>
        <label className='mb-2'>
          { 'Last name: ' }
          <input type = 'text' name = 'lastName' />
        </label>
        <label className='mb-2'>
          { `Email: `}
          <input type='email' name='email' />
        </label>
        <label className='mb-2'>
          { `Password: `}
          <input type='password' name='password' />
        </label>
        <button>Sign up!</button>
      </form>
      <button
        className = 'toggle-button'
        onClick = { toggleNewUser }
      >
        ...or sign in
      </button>
    </div>
  )
}

export default SignUp