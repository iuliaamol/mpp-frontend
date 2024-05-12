import React, { createContext, useState, useContext, useEffect } from 'react'
import { User } from '../models/user'
import axios from 'axios'

// Define the shape of your context
interface UsersContextType {
  users: User[]
  addUser: (newUser: User) => void
  deleteUser: (userId: number) => void
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
}

// Create the context object
export const UsersContext = createContext<UsersContextType | null>(null)

// Define a provider component
interface UsersContextProviderProps {
  children: React.ReactNode
}

export function UsersContextProvider({ children }: UsersContextProviderProps) {
  const [users, setUsers] = useState<User[]>([])

  // Function to add a user to the list
  const addUser = (newUser: User) => {
    setUsers((prevUsers) => [...prevUsers, newUser])
  }
  const updateUsers = (updatedUsers: User[]) => {
    setUsers(updatedUsers)
  }
  const deleteUser = (userId: number) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId))
  }

  // Fetch users from backend when component mounts
  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/users')
      // if (!response.ok) {
      //   throw new Error('Failed to fetch users')
      // }
      // const data = await response.json()

      setUsers(response.data)
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const usersContextValue: UsersContextType = {
    users,
    addUser,
    deleteUser,
    setUsers: function (value: React.SetStateAction<User[]>): void {
      // Update the users array with the new value
      setUsers(value)
    },
  }

  return (
    <UsersContext.Provider value={usersContextValue}>
      {children}
    </UsersContext.Provider>
  )
}

// Custom hook to use the users context
export const useUsersContext = () => {
  const context = useContext(UsersContext)
  if (!context) {
    throw new Error(
      'useUsersContext must be used within a UsersContextProvider'
    )
  }
  return context
}
