import React, { useState } from 'react'
import { Event } from '../../models/event'
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs'
import './Table.css'

import { Modal } from '../modal/Modal'

interface TableProps {
  events: Event[]
}

export function Table({ events }: TableProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  const handleDelete = (event: Event) => {
    setSelectedEvent(event)
    setModalOpen(true)
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
            <tr key={event.getId()}>
              <td>{event.getName()}</td>
              <td>{event.getPrice()}$</td>
              <td>
                <span className='actions'>
                  <BsFillTrashFill
                    className='delete-btn'
                    onClick={() => handleDelete(event)}
                  />
                  {modalOpen && (
                    <Modal
                      selectedEvent={selectedEvent}
                      setModalOpen={setModalOpen}
                    />
                  )}
                  <BsFillPencilFill className='edit-btn' />
                </span>
              </td>
            </tr>
          ))}
        </body>
      </table>
    </div>
  )
}
