import React from 'react'
import './detailData.css'
import { useParams } from 'react-router-dom'
import { useEventsContext } from '../../contexts/eventContext'

export function EventDetail() {
  const { id } = useParams<{ id: string }>() // Access the event ID from the route parameters
  const { events } = useEventsContext() // Access the events from your context

  // Find the selected event using the ID
  const selectedEvent = events.find(
    (event) => event.getId() === parseInt(id, 10)
  )

  // Render the event details
  return (
    <div className='event-detail'>
      <h2>Event Details</h2>
      {selectedEvent && (
        <div className='event-info'>
          <p>Name: {selectedEvent.getName()}</p>
          <p>Price: ${selectedEvent.getPrice()}</p>
          <p>Type: {selectedEvent.getType()}</p>
        </div>
      )}
    </div>
  )
}
