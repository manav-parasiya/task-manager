import React, { useState } from 'react'

import '../styles/login.css';

function Login() {


  // const [form,setForm] = useState({
  //   email : '',
  //   password: '',
  // }); - Tried but failed to implemtn

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const updateEmail = (e) => {
  //   setForm((prev) => {
  //     console.log('prev ===>', prev);
  //     email: e?.target.value
  //   })

  // }
  // const updatePassword = (e) => {
  //   setForm(() =>{
  //     password: e?.target.value
  //   })

  // }  - Tried but failed to implemtn

  const updateEmail = (e) => {
    setEmail(e?.target.value)

  }
  const updatePassword = (e) => {
    setPassword(e?.target.value)

  }

  const submitForm = (e) => {
    e.preventDefault();
    console.log('email ===>', email, 'password ====>', password);
  }
  return (
    <>
      <div className='login-section container'>
        <div className="login-card-container">
          <div className="login-card">
            <form action="" method="post" onSubmit={(e) => submitForm(e)}>
              <label htmlFor="email">Email</label>
              <input type="email" onChange={(e) => updateEmail(e)} name="email" id="email" defaultValue={email} />
              <label htmlFor="password">Password</label>
              <input type="password" onChange={(e) => updatePassword(e)} name="password" id="password" defaultValue={password} />
              <button type="submit">Login</button>
            </form>
          </div>

        </div>
      </div>
    </>
  )
}
export default Login