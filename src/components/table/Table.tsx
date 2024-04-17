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

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentEvents = events.slice(indexOfFirstItem, indexOfLastItem)

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

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
    <div className='table-container'>
      <div className='table-wrapper'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {currentEvents.map((event) => (
              <tr key={event.getId()}>
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
          </tbody>
        </table>
        <div className='pagination-bar'>
          <ul className='pagination'>
            {Array.from({
              length: Math.ceil(events.length / itemsPerPage),
            }).map((_, index) => (
              <li key={index}>
                <button onClick={() => paginate(index + 1)}>{index + 1}</button>
              </li>
            ))}
          </ul>
          <span>
            {`Showing ${indexOfFirstItem + 1}-${Math.min(indexOfLastItem, events.length)} of ${events.length}`}
          </span>
        </div>
      </div>
    </div>
  )
}
