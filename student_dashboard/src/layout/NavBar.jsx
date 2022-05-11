import React from 'react'
import { Link } from 'react-router-dom'

export const NavBar = () => {
  return (
    <div className='nav-bar'>
      <Link to='/'>Data Table</Link>
      Winc Academy Student Dashboard
      <Link to='/'>Students</Link>
    </div>
  )
}
