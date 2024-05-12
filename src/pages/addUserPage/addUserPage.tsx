import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UsersContext, useUsersContext } from '../../contexts/userContext'
import { User } from '../../models/user'
import { useContext } from 'react'
import axios from 'axios'

export function AddUserPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { users } = useUsersContext()
  const contextValue = useContext(UsersContext) // Access the context
  const { addUser } = contextValue as { addUser: (user: User) => void } // Type assertion

  const handleAddUser = async () => {
    if (!username || !email || !password) {
      alert('Please fill in all fields')
      return
    }

    const newUser = {
      id: users.length + 1,
      username: username,
      email: email,
      password: password,
    }

    try {
      const response = await fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })

      if (!response.ok) {
        throw new Error('Failed to add user')
      }

      navigate('/seeUsers') // Go back to the home page after successful addition
    } catch (error) {
      console.error('Error adding user:', error)
      alert('Failed to add user')
    }
  }

  return (
    <>
      <div className='modal-container' data-testid='modal-container'>
        <div className='modal' data-testid='modal'>
          <h1>Add a new user</h1>
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleAddUser}>Submit</button>
        </div>
      </div>
    </>
  )
}

export default AddUserPage
