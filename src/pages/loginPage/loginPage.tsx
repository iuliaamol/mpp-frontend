import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/auth/authenticate`,
        {
          username,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      console.log(response.data)
      // Assuming the response contains a token
      var token = response.data.token
      // Save the token to local storage or a context for future requests
      localStorage.setItem('token', token)
      // Redirect to a protected route or dashboard
      navigate('/userPage')
    } catch (error) {
      console.error('Error logging in:', error)
    }
  }

  return (
    <>
      <div className='modal-container'>
        <div className='modal'>
          <h1>Login</h1>
          <input
            type='username'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='input-field'
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='input-field'
          />
          <button onClick={handleLogin} className='login-button'>
            Login
          </button>
        </div>
      </div>
    </>
  )
}
