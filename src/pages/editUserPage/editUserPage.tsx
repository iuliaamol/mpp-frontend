import React, { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { User } from '../../models/user'

export function EditUser() {
  const { id } = useParams<{ id: string }>()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  useEffect(() => {
    // Fetch user details from the backend based on the user ID
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/${id}`
        )
        setSelectedUser(response.data)
        setUsername(response.data.username)
        setEmail(response.data.email)
        setPassword(response.data.password)
      } catch (error) {
        console.error('Error fetching user details:', error)
      }
    }

    fetchUser()

    // Cleanup function to prevent memory leaks
    return () => {
      setSelectedUser(null) // Clear selectedUser when component unmounts
    }
  }, [id])

  const handleEditUser = async () => {
    try {
      // Update the user details
      await axios.put(`http://localhost:8080/api/users/${id}`, {
        username,
        email,
        password,
      })
      navigate('/seeUsers')
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  return (
    <>
      <div className='modal-container'>
        <div className='modal'>
          <h1>Edit User</h1>
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
          <button onClick={handleEditUser} className='edit-button'>
            Edit User
          </button>
        </div>
      </div>
    </>
  )
}
