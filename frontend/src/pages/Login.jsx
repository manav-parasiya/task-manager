import React from 'react'

import '../styles/login.css';

function Login() {
  return (
    <>
      <div className='login-section container'>
        <div className="login-card-container">
          <div className="login-card">
            <form action="" method="post">
              <label htmlFor="email">EmailL</label>
              <input type="email" name="email" id="email" />
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" />
            </form>
          </div>

        </div>
      </div>
    </>
  )
}

export default Login