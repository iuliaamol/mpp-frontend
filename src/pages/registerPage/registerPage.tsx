import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/auth/register',
        {
          username,
          email,
          password,
        }
      )
      // Assuming the response contains a token
      const { token } = response.data
      // Save the token to local storage or a context for future requests
      localStorage.setItem('authToken', token)
      // Redirect to a protected route or dashboard
      navigate('/')
    } catch (error) {
      console.error('Error registering:', error)
    }
  }

  return (
    <>
      <div className='modal-container'>
        <div className='modal'>
          <h1>Register</h1>
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='input-field'
          />
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='input-field'
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='input-field'
          />
          <button onClick={handleRegister} className='register-button'>
            Register
          </button>
        </div>
      </div>
    </>
  )
}
