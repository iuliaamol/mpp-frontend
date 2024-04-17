import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EventsContext, useEventsContext } from '../../contexts/eventContext'
import { Event } from '../../models/event'
import { useContext } from 'react'
import './addDataForum.css'

export function AddPage() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [type, setType] = useState('')
  const navigate = useNavigate()
  const { events } = useEventsContext()
  const contextValue = useContext(EventsContext) // Access the context
  const { addEvent } = contextValue as { addEvent: (event: Event) => void } // Type assertion

  const handleAddEvent = async () => {
    if (!name || !price || !type) {
      alert('Please fill in all fields')
      return
    }

    const newEvent = {
      id: events.length + 1,
      name: name,
      price: parseFloat(price),
      type: type,
    }

    try {
      const response = await fetch('http://127.0.0.1:8080/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      })

      if (!response.ok) {
        throw new Error('Failed to add event')
      }

      navigate('/') // Go back to the home page after successful addition
    } catch (error) {
      console.error('Error adding event:', error)
      alert('Failed to add event')
    }
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
          <button onClick={handleAddEvent}>Submit</button>
        </div>
      </div>
    </>
  )
}

export default AddPage
