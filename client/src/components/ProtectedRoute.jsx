import React from 'react'
import { Link } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
  const loggeduser = window.localStorage.getItem('loggeduserinformation')
  if (!loggeduser) {
    return <main style={{ padding: "5rem" }} className='content'>
      <p>You're not logged, <Link to='/login'>Return to login</Link></p>
    </main>
  }

  return children;
}

export default ProtectedRoute