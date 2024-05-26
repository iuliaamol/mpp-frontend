import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EventsContext, useEventsContext } from '../../contexts/eventContext'
import { Event } from '../../models/event'
import { useContext } from 'react'
import './addDataForum.css'
import { useUsersContext } from '../../contexts/userContext'

export function AddPage() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [type, setType] = useState('')
  const [selectedUserId, setSelectedUserId] = useState('')
  const navigate = useNavigate()
  const { events } = useEventsContext()
  const contextValue = useContext(EventsContext) // Access the context
  const { addEvent } = contextValue as { addEvent: (event: Event) => void } // Type assertion
  const { users } = useUsersContext()

  const handleAddEvent = async () => {
    if (!name.trim() || !price.trim() || !type.trim() || !selectedUserId) {
      alert('Please fill in all fields and select a user')
      return
    }

    const newEvent = {
      id: events.length + 1,
      name: name,
      price: parseFloat(price),
      type: type,
      userId: parseInt(selectedUserId),
    }

    try {
      const response = await fetch('http://localhost:8080/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      })

      if (!response.ok) {
        throw new Error('Failed to add event')
      }
    } catch (error) {
      console.log('error', error)
    }
    navigate('/seeEvents')
  }

  return (
    <>
      <div className='modal-container' data-testid='modal-container'>
        <div className='modal' data-testid='modal'>
          <h1>Add a new event</h1>
          <input
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type='number'
            placeholder='Price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type='text'
            placeholder='Type'
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
          >
            <option value=''>Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}{' '}
                {/* Assuming user object has a 'name' property */}
              </option>
            ))}
          </select>
          <button onClick={handleAddEvent}>Submit</button>
        </div>
      </div>
    </>
  )
}

export default AddPage
