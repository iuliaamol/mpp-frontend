import { useNavigate } from 'react-router-dom'

import { User } from '../../models/user'

import React from 'react'
import axios from 'axios'
import { useUsersContext } from '../../contexts/userContext'

interface UserModalProps {
  selectedUser: User | null
  setModalOpen: (open: boolean) => void // Function to control modal open state
}

export function UserModal({ selectedUser, setModalOpen }: UserModalProps) {
  const navigate = useNavigate()
  const { users, setUsers } = useUsersContext()

  const onYes = async () => {
    if (selectedUser) {
      try {
        // Send DELETE request using Axios
        const response = await axios.delete(
          `http://localhost:8080/api/users/${selectedUser.id}`
        )
        console.log(users)

        if (response.status === 200) {
          // Update the user list after successful deletion
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user.id !== selectedUser.id)
          )
          window.location.reload()
          setModalOpen(false) // Close the modal
          navigate('/seeUsers')
        } else {
          console.error('Failed to delete user:', response.status)
        }
      } catch (error) {
        console.error('Error deleting user:', error)
      }
      setModalOpen(false)
    }
  }

  const onNo = () => {
    // Close the modal if the user chooses not to delete
    setModalOpen(false)
  }

  return (
    <div className='modal-container'>
      <div className='modal'>
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete this user?</p>
        <div className='btn'>
          <button onClick={onYes}>Yes</button>
          <button onClick={onNo}>No</button>
        </div>
      </div>
    </div>
  )
}
