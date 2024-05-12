import './detailData.css'
import { useParams } from 'react-router-dom'
import { useEventsContext } from '../../contexts/eventContext'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { User } from '../../models/user'

export function EventDetail() {
  const { id } = useParams<{ id: string }>()
  const { events } = useEventsContext()
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [setedUser, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Fetch event details from the backend based on the id
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/events/${id}`
        )
        setSelectedEvent(response.data)
        console.log(response.data)
        console.log('userid', response.data.userId)

        // Fetch user details based on the user ID associated with the event
        const userResponse = await axios.get(
          `http://localhost:8080/api/users/${response.data.userId}`
        )
        setUser(userResponse.data)
        console.log('user', userResponse.data)
      } catch (error) {
        console.error('Error fetching event details:', error)
      }
    }

    fetchEvent()

    // Cleanup function to prevent memory leaks
    return () => {
      setSelectedEvent(null) // Clear selectedEvent when component unmounts
    }
  }, [id]) // Fetch event details whenever id changes

  return (
    <div className='container2' data-testid='event-detail-container'>
      <div className='event-detail' data-testid='event-detail'>
        <h2>Event Details</h2>
        {selectedEvent && (
          <div className='event-info' data-testid='event-info'>
            <p>Name: {selectedEvent.name}</p>
            <p>Price: ${selectedEvent.price}</p>
            <p>Type: {selectedEvent.type}</p>
            {setedUser && <p>Created by: {setedUser.username}</p>}
          </div>
        )}
      </div>
    </div>
  )
}
