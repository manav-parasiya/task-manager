import React, { useState } from 'react'
import axios from 'axios';

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
    console.log('email ===>', email, 'password ====>', password, 'name ===>', name);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "name": "manav256",
      "email": "testemail@example.com",
      "password": "12345678"
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    const result = await axios({
      method: 'post',
      url: 'https://task-manager-production-4c2f.up.railway.app/v1/api/register',
      data: {
        name: name,
        email: email,
        password: password,
      },
    });
   
    console.log('result ====>',result);
  }
  return (
    <>
      <div className='login-section container'>
        <div className="login-card-container">
          <div className="login-card">
            <form action="" method="post" onSubmit={(e) => submitForm(e)}>
              <label htmlFor="name">Name</label>
              <input type="text" onChange={(e) => updateName(e)} name="name" id="name" defaultValue={name} />
              <label htmlFor="email">Email</label>
              <input type="email" onChange={(e) => updateEmail(e)} name="email" id="email" defaultValue={email} />
              <label htmlFor="password">Password</label>
              <input type="password" onChange={(e) => updatePassword(e)} name="password" id="password" defaultValue={password} />
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