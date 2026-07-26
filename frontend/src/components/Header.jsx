import React from 'react'

// Stlye File import
import "../styles/header.css";

// Icons imports
import profileIcon from '../assets/profile-circle-svgrepo-com.svg';

function Header() {
  return (
    <>
      <div className='header-section container'>
        <div className='logo-section'><p>Task Manager</p></div>
        <div className='navigation-section'>
          <ul>
            <li> <img src={profileIcon} height={40} width={40} alt="profile" /></li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Header