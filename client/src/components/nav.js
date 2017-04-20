import React from 'react'
import {Link} from 'react-router-dom'

const Nav = () => {
  return (
    <ul>
        <li><Link to="/secret">secret route / only if youre logged in</Link></li>
        <li><Link to="/">Homepage</Link></li>
        <li><Link to="/login">Login Page</Link></li>
        <li><Link to="/NewUser">Create an Account</Link></li>
    </ul>
  )
}

export default Nav;