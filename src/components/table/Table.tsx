import { useState } from 'react'
import { Event } from '../../models/event'
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs'
import { RxActivityLog } from 'react-icons/rx'
import './Table.css'

import { Modal } from '../modal/Modal'
import { useNavigate } from 'react-router-dom'

interface TableProps {
  events: Event[]
}

export function Table({ events }: TableProps) {
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  const handleDelete = (event: Event) => {
    setSelectedEvent(event)
    setModalOpen(true)
  }

  const handleEdit = (event: Event) => {
    setSelectedEvent(event)
    navigate(`/editPage/${event.getId()}`)
  }

  const handleRowClick = (event: Event) => {
    setSelectedEvent(event)
    navigate(`/detailPage/${event.getId()}`)
  }

  return (
    <div className='table-wrapper'>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <body>
          {events.map((event) => (
            <tr
              key={event.getId()}
              //onClick={() => handleRowClick(event)}
            >
              <td>{event.getName()} </td>
              <td>{event.getPrice()}$</td>
              <td>
                <span className='actions'>
                  <RxActivityLog
                    className='edit-btn'
                    onClick={() => handleRowClick(event)}
                  />
                  <BsFillTrashFill
                    className='delete-btn'
                    onClick={() => handleDelete(event)}
                    data-testid={`delete-btn-${event.getId()}`}
                  />
                  {modalOpen && (
                    <Modal
                      selectedEvent={selectedEvent}
                      setModalOpen={setModalOpen}
                    />
                  )}
                  <BsFillPencilFill
                    className='detail-btn'
                    onClick={() => handleEdit(event)}
                  />
                </span>
              </td>
            </tr>
          ))}
        </body>
      </table>
    </div>
  )
}
