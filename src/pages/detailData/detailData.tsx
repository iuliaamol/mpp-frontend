import './detailData.css'
import { useParams } from 'react-router-dom'
import { useEventsContext } from '../../contexts/eventContext'

export function EventDetail() {
  const { id } = useParams<{ id: string }>()
  const { events } = useEventsContext()

  // Find the selected event using the id
  const selectedEvent = events.find(
    (event) => event.getId() === parseInt(id!, 10)
  )

  return (
    <div className='container2'>
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
    </div>
  )
}
