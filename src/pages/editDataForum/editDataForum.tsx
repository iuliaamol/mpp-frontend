import React, { useEffect, useState } from 'react'
import { Event } from '../../models/event'
import './editDataForum.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useEventsContext } from '../../contexts/eventContext'

export function EditData() {
  const { id } = useParams<{ id: string }>()
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [type, setType] = useState('')
  const navigate = useNavigate()
  const { events, setEvents } = useEventsContext()

  // Find the event with the given ID
  const eventId = id ? parseInt(id, 10) : undefined

  // Find the event with the given ID
  const selectedEvent = events.find((event) => event.getId() === eventId)

  useEffect(() => {
    if (selectedEvent) {
      setName(selectedEvent.getName())
      setPrice(selectedEvent.getPrice().toString())
      setType(selectedEvent.getType())
    }
  }, [selectedEvent])

  const handleEditEvent = () => {
    if (!name || !price || !type || !eventId) {
      alert('Please fill in all fields')
      return
    }

    // Update the event with the new data
    const updatedEvent = new Event(eventId, name, parseFloat(price), type)
    const updatedEvents = events.map((event) =>
      event.getId() === eventId ? updatedEvent : event
    )
    setEvents(updatedEvents)
    navigate('/')
  }

  return (
    <>
      <div className='modal-container'>
        <div className='modal'>
          <h1>Edit Event</h1>
          <input
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='input-field'
          />
          <input
            type='number'
            placeholder='Price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className='input-field'
          />
          <input
            type='text'
            placeholder='Type'
            value={type}
            onChange={(e) => setType(e.target.value)}
            className='input-field'
          />
          <button onClick={handleEditEvent} className='edit-button'>
            Edit Event
          </button>
        </div>
      </div>
    </>
  )
}
