import React, { useState } from 'react'
import axios from 'axios';

import api from '../hooks/axiosApiInterceptor';


function Register() {


  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const updateName = (e) => {
    setName(e?.target.value)
  }

  const updateEmail = (e) => {
    setEmail(e?.target.value)
  }

  const updatePassword = (e) => {
    setPassword(e?.target.value)
  }

  const submitForm = async (e) => {
    e.preventDefault();

    const result = await api.post('/v1/api/register',
      {
        name: name,
        email: email,
        password: password,
      },
    );

    localStorage.setItem('accessToken', result?.data?.data?.accessToken);
    localStorage.setItem('refreshToken', result?.data?.data?.refreshToken);

  }
  return (
    <>
      <div className='login-section container'>
        <div className="login-card-container">
          <div className="login-card">
            <form action="" method="post" onSubmit={(e) => submitForm(e)}>
              <label htmlFor="name">Name</label>
              <input type="text" onChange={(e) => updateName(e)} name="name" id="name" value={name} />
              <label htmlFor="email">Email</label>
              <input type="email" onChange={(e) => updateEmail(e)} name="email" id="email" value={email} />
              <label htmlFor="password">Password</label>
              <input type="password" onChange={(e) => updatePassword(e)} name="password" id="password" value={password} />
              <button type="submit">Register

              </button>
            </form>
          </div>

        </div>
      </div>
    </>
  )
}

export default Register