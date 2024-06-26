import { useEffect, useRef, useState } from 'react'
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

  // Infinite scroll states
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 50
  const [displayedEvents, setDisplayedEvents] = useState(
    events.slice(0, itemsPerPage)
  )

  // Ref for the table container
  const tableContainerRef = useRef<HTMLDivElement>(null)

  // Infinite scroll handler
  const handleScroll = () => {
    if (tableContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        tableContainerRef.current
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        // Load more data
        setCurrentPage((prevPage) => prevPage + 1)
      }
    }
  }

  useEffect(() => {
    if (tableContainerRef.current) {
      const tableContainer = tableContainerRef.current
      tableContainer.addEventListener('scroll', handleScroll)
      return () => {
        tableContainer.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  useEffect(() => {
    const newEvents = events.slice(0, currentPage * itemsPerPage)
    setDisplayedEvents(newEvents)
  }, [currentPage, events])

  const handleDelete = (event: Event) => {
    setSelectedEvent(event)
    setModalOpen(true)
  }

  const handleEdit = (event: Event) => {
    setSelectedEvent(event)
    navigate(`/editPage/${event.id}`)
  }

  const handleRowClick = (event: Event) => {
    setSelectedEvent(event)
    navigate(`/detailPage/${event.id}`)
  }

  return (
    <div className='table-container' ref={tableContainerRef}>
      <div className='table-wrapper'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {displayedEvents.map((event) => (
              <tr key={event.id}>
                <td>{event.name} </td>
                <td>{event.price}$</td>
                <td>
                  <span className='actions'>
                    <RxActivityLog
                      className='edit-btn'
                      onClick={() => handleRowClick(event)}
                    />
                    <BsFillTrashFill
                      className='delete-btn'
                      onClick={() => handleDelete(event)}
                      data-testid={`delete-btn-${event.id}`}
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
        {/* <div className='pagination-bar'>
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
        </div> */}
      </div>
    </div>
  )
}
