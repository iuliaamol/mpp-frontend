import { useNavigate } from 'react-router-dom'
import './Modal.css'
import { Event } from '../../models/event'

import React, { useState } from 'react'
import { useEventsContext } from '../../contexts/eventContext'

interface ModalProps {
  selectedEvent: Event | null
  setModalOpen: (open: boolean) => void // Function to control modal open state
}

export function Modal({ selectedEvent, setModalOpen }: ModalProps) {
  const navigate = useNavigate()
  const { events, setEvents } = useEventsContext()

  const onYes = () => {
    if (selectedEvent) {
      setEvents(events.filter((e) => e.getId() !== selectedEvent.getId()))
      setModalOpen(false)
      navigate('/')
    }
  }
  const onNo = () => {
    setModalOpen(false)
    navigate('/')
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
