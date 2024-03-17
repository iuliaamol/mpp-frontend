import React, { useState } from 'react'
import { Event } from '../../models/event'
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs'
import './Table.css'

import { Modal } from '../modal/Modal'
import { Link, useNavigate } from 'react-router-dom'

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
                  <BsFillPencilFill
                    className='edit-btn'
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
