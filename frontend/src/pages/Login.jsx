import React from 'react'

function Login() {
  return (
    <>
      <div className='login-section container'>
            <form action="" method="post">
              <label htmlFor="email">EmailL</label>
              <input type="email" name="email" id="email" />
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" />
            </form>
      </div>
    </>
  )
}

export default Login