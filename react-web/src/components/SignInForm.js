import React from 'react'

function SignInForm ({
  onSignIn,
  toggleNewUser
}) {
  return (
    <div>
      <form
        onSubmit={ (event) => {
          event.preventDefault() // Prevent old way of form submission
          const form = event.target
          const elements = form.elements
          const email = elements.email.value
          const password = elements.password.value
          // console.log({ email, password })
          onSignIn({ email, password })
        }}
      >
        <label 
          className='mb-2'
        >
          { `Email: `}
          <input 
            type='email'
            name='email'
          />
        </label>
        <label 
        className='mb-2'
        >
          { `Password: `}
          <input 
            type='password'
            name='password'
          />
        </label>
        <button>
          Sign in
        </button>
      </form>
      <button
        className = 'toggle-button'
        onClick = { toggleNewUser }
      >
        ...or sign up
      </button>
    </div>
  )
}

export default SignInForm