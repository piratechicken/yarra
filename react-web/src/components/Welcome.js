import React from 'react'

const Welcome = ({
  decodedToken,
  onSignOut
}) => {
  return (
    <div className='welcome'>
      <h3>Hello { decodedToken.name }!</h3>
      <button onClick = { onSignOut }>
        Sign out
      </button>    
    </div>
  )
}

export default Welcome