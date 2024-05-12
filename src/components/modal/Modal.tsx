import { useNavigate } from 'react-router-dom'
import './Modal.css'
import { Event } from '../../models/event'

import React, { useState } from 'react'
import { useEventsContext } from '../../contexts/eventContext'
import axios from 'axios'

interface ModalProps {
  selectedEvent: Event | null
  setModalOpen: (open: boolean) => void // Function to control modal open state
}

export function Modal({ selectedEvent, setModalOpen }: ModalProps) {
  const navigate = useNavigate()
  const { events, setEvents } = useEventsContext()

  const onYes = async () => {
    if (selectedEvent) {
      try {
        // Send DELETE request using Axios
        const response = await axios.delete(
          `http://localhost:8080/api/events/${selectedEvent.id}`
        )

        if (response.status === 200) {
          // Remove the event from the local state
          setEvents((prevEvents) =>
            prevEvents.filter((event) => event.id !== selectedEvent.id)
          )
          setModalOpen(false)
          navigate('/seeEvents')
        } else {
          console.error('Failed to delete event:', response.status)
        }
      } catch (error) {
        console.error('Error deleting event:', error)
      }
    }
  }
  const onNo = () => {
    setModalOpen(false)
    navigate('/seeEvents')
  }

  return (
    <div className='modal-container'>
      <div className='modal'>
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete?</p>
        <div className='btn'>
          <button onClick={onYes}>Yes</button>
          <button onClick={onNo}>No</button>
        </div>
      </div>
    </div>
  )
}
