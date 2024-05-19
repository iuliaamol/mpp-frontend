import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEventsContext } from '../../contexts/eventContext'
import { Table } from '../../components/table/Table'
import type { Event } from '../../models/event'
import './seeData.css'
import axios from 'axios'

export function Home() {
  const { events, setEvents } = useEventsContext()
  const navigate = useNavigate()

  useEffect(() => {
    const handleOffline = () => {
      alert('You are offline. Please check your internet connection.')
    }

    window.addEventListener('offline', handleOffline)

    // Fetch events only when online
    if (navigator.onLine) {
      fetchEvents()
    }

    return () => {
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const fetchEvents = async (): Promise<void> => {
    try {
      //http://127.0.0.1:8080/event/
      const response = await axios.get('http://localhost:8080/api/events')
      // if (!response.ok) {
      //   throw new Error('Failed to fetch events')
      // }
      //const data = await response.json()
      setEvents(response.data)
    } catch (error) {
      console.error('Error fetching events:', error)
    }
  }

  const navigateToAddPage = () => {
    navigate('/addPage')
  }

  const navigateToUsers = () => {
    navigate('/seeUsers')
  }

  const handleSort = () => {
    const sortedEvents = [...events].sort((a, b) => a.price - b.price)
    setEvents(sortedEvents)
  }

  const handleChart = () => {
    navigate('/chartPage')
  }

  return (
    <div className='eventsmain-container'>
      <h1>Events</h1>
      <div className='seeusers'>
        <button onClick={navigateToUsers}>See Users</button>
      </div>

      <div className='container'>
        <Table events={events}></Table>
      </div>
      <div className='buttons'>
        <button onClick={navigateToAddPage} className='add-button'>
          Add a new Event
        </button>
        <button onClick={handleSort} className='sort-button'>
          Sort the events by price
        </button>
        <button onClick={handleChart} className='chart-button'>
          Generate a Chart
        </button>
      </div>
    </div>
  )
}
