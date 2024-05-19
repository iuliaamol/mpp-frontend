import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserModal } from '../../components/userModal/userModal'
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs'
import { RxActivityLog } from 'react-icons/rx'
import { User } from '../../models/user'
import { UserTable } from '../../components/table/UserTable'
import './seeUsers.css'
import { useUsersContext } from '../../contexts/userContext'

export function SeeUsers() {
  const { users, setUsers } = useUsersContext()

  const navigate = useNavigate()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users')
        setUsers(response.data)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchUsers()
  }, [])

  const navigateToAddUserPage = () => {
    navigate('/addUserPage')
  }

  // const handleUserDetail = (user: User) => {
  //   setSelectedUser(user)
  //   navigate(`/detailUserPage/${user.id}`)
  // }

  // const handleUserDelete = (user: User) => {
  //   setSelectedUser(user)
  //   setUserModalOpen(true)
  // }

  // const handleUserEdit = (user: User) => {
  //   setSelectedUser(user)
  //   navigate(`/editUserPage/${user.id}`)
  // }

  return (
    <div className='usersmain-container'>
      <h1>Users</h1>
      <div className='container'>
        <UserTable users={users}></UserTable>
      </div>
      <div className='buttons'>
        <button onClick={navigateToAddUserPage} className='add-button'>
          Add a new User
        </button>
      </div>
    </div>
  )
}

export default SeeUsers
