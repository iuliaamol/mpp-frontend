import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import React from 'react'

import { EventsContext } from '../../contexts/eventContext'
import { Event } from '../../models/event'
import { Card } from '../../components/card/Card'
import { Button } from '../../components/button/Button'
import { Link } from 'react-router-dom'
import { useRef, useContext } from 'react'

let demoEvent1 = new Event(1, 'White Party', 100, 'party')
let demoEvent2 = new Event(2, 'Art Workshop', 100, 'workshop')
let demoEvent3 = new Event(3, 'Fitness Workshop', 30, 'workshop')
let demoEvent4 = new Event(4, 'Food Festival', 40, 'festival')
let demoEvent5 = new Event(5, 'Comedy Show', 25, 'show')

export const events: Event[] = [
  demoEvent1,
  demoEvent2,
  demoEvent3,
  demoEvent4,
  demoEvent5,
]

export function AddPage() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [type, setType] = useState('')
  const navigate = useNavigate()
  const contextValue = useContext(EventsContext) // Access the context
  const { addEvent } = contextValue as { addEvent: (event: Event) => void } // Type assertion

  const handleAddEvent = () => {
    if (!name || !price || !type) {
      alert('Please fill in all fields')
      return
    }
    // Create a new Event object using the provided data
    const newEvent = new Event(events.length + 1, name, parseFloat(price), type)
    addEvent(newEvent)
    setName('')
    setPrice('')
    setType('')
  }
  return (
    <>
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
      <button onClick={handleAddEvent}>Add Event</button>
      <ul>
        {events.map((event) => (
          <li key={event.getId()}>{event.getName()}</li>
        ))}
      </ul>
    </>
  )
}

export default AddPage
