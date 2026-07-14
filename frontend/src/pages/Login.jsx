import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

import '../styles/login.css';

function Login() {

  const navigate = useNavigate();
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

  const submitForm = async (e) => {
    e.preventDefault();

    const result = await axios.post('https://task-manager-production-4c2f.up.railway.app/v1/api/login', {
      email,
      password
    });

    localStorage.setItem('accessToken',result?.data?.data?.accessToken);
    localStorage.setItem('refreshToken',result?.data?.data?.refreshToken);

    navigate('/');
  }
  return (
    <>
      <div className='login-section container'>
        <div className="login-card-container">
          <div className="login-card">
            <form action="" method="post" onSubmit={(e) => submitForm(e)}>
              <label htmlFor="email">Email</label>
              <input type="email" onChange={(e) => updateEmail(e)} name="email" id="email" value={email} />
              <label htmlFor="password">Password</label>
              <input type="password" onChange={(e) => updatePassword(e)} name="password" id="password" va={password} />
              <button type="submit">Login</button>
            </form>
          </div>

        </div>
      </div>
    </>
  )
}
export default Login