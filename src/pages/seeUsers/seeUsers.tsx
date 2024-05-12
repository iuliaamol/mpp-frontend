import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserModal } from '../../components/userModal/userModal'
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs'
import { RxActivityLog } from 'react-icons/rx'
import { User } from '../../models/user'
import './seeUsers.css'

export function SeeUsers() {
  const [users, setUsers] = useState([])
  const navigate = useNavigate()
  const [userModalOpen, setUserModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users')
        setUsers(response.data)
      } catch (error) {
        console.error('Error fetching ', error)
      }
    }
    fetchUsers()
  }, [])

  const navigateToAddUserPage = () => {
    navigate('/addUserPage')
  }

  const handleUserDetail = (user: User) => {
    setSelectedUser(user)
    navigate(`/detailUserPage/${user.id}`)
  }

  const handleUserDelete = (user: User) => {
    setSelectedUser(user)
    setUserModalOpen(true)
  }

  const handleUserEdit = (user: User) => {
    setSelectedUser(user)
    navigate(`/editUserPage/${user.id}`)
  }

  return (
    <div>
      <h1>Users</h1>
      <button onClick={() => navigate('/')}>Back</button>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <span className='userActions'>
                  <RxActivityLog onClick={() => handleUserDetail(user)} />
                  <BsFillTrashFill onClick={() => handleUserDelete(user)} />
                  {userModalOpen && (
                    <UserModal
                      selectedUser={selectedUser}
                      setModalOpen={setUserModalOpen}
                    />
                  )}

                  <BsFillPencilFill onClick={() => handleUserEdit(user)} />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='addUserButton'>
        <button onClick={navigateToAddUserPage}>Add User</button>
      </div>
    </div>
  )
}

export default SeeUsers
