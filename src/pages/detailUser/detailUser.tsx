import './detailUser.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

export function UserDetail() {
  const { id } = useParams<{ id: string }>()
  const [selectedUser, setSelectedUser] = useState([])
  const [userEvents, setUserEvents] = useState([])
  const [showEvents, setShowEvents] = useState(false)

  useEffect(() => {
    // Fetch user details from the backend based on the id
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/${id}`
        )
        setSelectedUser(response.data)
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching user details:', error)
      }
    }

    const fetchUserEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/events`)
        const userEvents = response.data.filter(
          (event: { userId: any }) => event.userId === selectedUser.id
        )

        setUserEvents(userEvents)
        console.log(userEvents)
      } catch (error) {
        console.error('Error fetching user events:', error)
      }
    }

    fetchUser()
    fetchUserEvents()

    // Cleanup function to prevent memory leaks
    return () => {
      setSelectedUser(null) // Clear selectedUser when component unmounts
    }
  }, [id]) // Fetch user details whenever id changes

  const toggleEvents = () => {
    setShowEvents(!showEvents)
  }

  return (
    <div className='container2' data-testid='user-detail-container'>
      <div className='user-detail' data-testid='user-detail'>
        <h2>User Details</h2>
        {selectedUser && (
          <div className='user-info' data-testid='user-info'>
            <p>Username: {selectedUser.username}</p>
            <p>Email: {selectedUser.email}</p>
            {userEvents.length > 0 && (
              <div>
                <button onClick={toggleEvents}>
                  {showEvents ? 'Hide Events' : 'Show Events'}
                </button>
                {showEvents && (
                  <ul>
                    {userEvents.map((event) => (
                      <li key={event.id}>
                        <p> {event.name}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            {userEvents.length === 0 && <p>No events found for this user.</p>}
          </div>
        )}
      </div>
    </div>
  )
}
