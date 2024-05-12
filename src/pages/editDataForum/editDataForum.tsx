import React, { useEffect, useState } from 'react'
import type { Event } from '../../models/event'
import './editDataForum.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useEventsContext } from '../../contexts/eventContext'
import axios from 'axios'
import { User } from '../../models/user'

export function EditData() {
  const { id } = useParams<{ id: string }>()
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [type, setType] = useState('')
  const navigate = useNavigate()
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  useEffect(() => {
    //fetch the event from the baackend based on id
    const fetchEvent = async () => {
      try {
        const eventResponse = await axios.get(
          `http://localhost:8080/api/events/${id}`
        )
        setSelectedEvent(eventResponse.data)
        setName(eventResponse.data.name)
        setPrice(eventResponse.data.price.toString())
        setType(eventResponse.data.type)

        // Fetch user details based on the user ID associated with the event
        const userResponse = await axios.get(
          `http://localhost:8080/api/users/${eventResponse.data.userId}`
        )
        setSelectedUser(userResponse.data)
        console.log('user', userResponse.data)
      } catch (error) {
        console.error('Error fetching event details:', error)
      }
    }

    fetchEvent()

    // Cleanup function to prevent memory leaks
    return () => {
      setSelectedEvent(null) // Clear selectedEvent when component unmounts
    }
  }, [id])

  const handleEditEvent = async () => {
    try {
      //update the event
      await axios.put(`http://localhost:8080/api/events/${id}`, {
        name,
        price: parseFloat(price),
        type,
      })
      navigate('/seeEvents')
    } catch (error) {
      console.log('Error ', error)
    }
  }

  return (
    <>
      <div className='modal-container'>
        <div className='modal'>
          <h1>Edit Event</h1>
          <input
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='input-field'
          />
          <input
            type='number'
            placeholder='Price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className='input-field'
          />
          <input
            type='text'
            placeholder='Type'
            value={type}
            onChange={(e) => setType(e.target.value)}
            className='input-field'
          />
          <div className='user-info'>
            <p>Created by: {selectedUser?.username}</p>
          </div>
          <button onClick={handleEditEvent} className='edit-button'>
            Edit Event
          </button>
        </div>
      </div>
    </>
  )
}
