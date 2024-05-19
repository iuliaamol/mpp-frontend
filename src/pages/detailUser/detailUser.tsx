import './detailUser.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { User } from '../../models/user'

export function UserDetail() {
  const { id } = useParams<{ id: string }>()
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [userEvents, setUserEvents] = useState([])
  const [showEvents, setShowEvents] = useState(false)
  //fetch the user details

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/${id}`
        )
        setSelectedUser(response.data)
        console.log(response.data)
      } catch (error) {
        console.error('error', error)
      }
    }
    fetchUser()
  }, [id])

  //fetch events based on selectedUser
  useEffect(() => {
    if (!selectedUser) return

    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/events`)
        console.log('response', response.data)
        console.log('selectedUser', selectedUser)
        const userEvents = response.data.filter(
          (event: any) => event.userId === selectedUser.id
        )
        setUserEvents(userEvents)
        console.log('userevents', userEvents)
      } catch (error) {
        console.error('error', error)
      }
    }
    fetchEvents()
  }, [selectedUser])

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
                  <div
                    className='events-container'
                    style={{ maxHeight: '200px', overflowY: 'auto' }}
                  >
                    <ul>
                      {userEvents.map((event: any) => (
                        <li key={event.id}>
                          <p>{event.name}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
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
