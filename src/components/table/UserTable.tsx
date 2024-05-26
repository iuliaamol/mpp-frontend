import { useEffect, useRef, useState } from 'react'

import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs'
import { RxActivityLog } from 'react-icons/rx'
import './Table.css'

//import { Modal } from '../modal/Modal'
import { useNavigate } from 'react-router-dom'
import { User } from '../../models/user'
import { UserModal } from '../userModal/userModal'

interface UserTableProps {
  users: User[]
}

export function UserTable({ users }: UserTableProps) {
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  // Infinite scroll states
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 50
  const [displayedUsers, setDisplayedUsers] = useState(
    users.slice(0, itemsPerPage)
  )

  // Ref for the table container
  const tableContainerRef = useRef<HTMLDivElement>(null)

  // Infinite scroll handler
  const handleScroll = () => {
    if (tableContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        tableContainerRef.current
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        // Load more data
        setCurrentPage((prevPage) => prevPage + 1)
      }
    }
  }

  useEffect(() => {
    if (tableContainerRef.current) {
      const tableContainer = tableContainerRef.current
      tableContainer.addEventListener('scroll', handleScroll)
      return () => {
        tableContainer.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  useEffect(() => {
    const newUsers = users.slice(0, currentPage * itemsPerPage)
    setDisplayedUsers(newUsers)
  }, [currentPage, users])

  const handleDelete = (user: User) => {
    setSelectedUser(user)
    setModalOpen(true)
  }

  const handleEdit = (user: User) => {
    setSelectedUser(user)
    navigate(`/editUserPage/${user.id}`)
  }

  const handleRowClick = (user: User) => {
    setSelectedUser(user)
    navigate(`/detailUserPage/${user.id}`)
  }

  return (
    <div className='table-container' ref={tableContainerRef}>
      <div className='table-wrapper'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.username} </td>
                <td>{user.email}</td>
                <td>
                  <span className='actions'>
                    <RxActivityLog
                      className='edit-btn'
                      onClick={() => handleRowClick(user)}
                    />
                    <BsFillTrashFill
                      className='delete-btn'
                      onClick={() => handleDelete(user)}
                      data-testid={`delete-btn-${user.id}`}
                    />
                    {modalOpen && (
                      <UserModal
                        selectedUser={selectedUser}
                        setModalOpen={setModalOpen}
                      />
                    )}
                    <BsFillPencilFill
                      className='detail-btn'
                      onClick={() => handleEdit(user)}
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
