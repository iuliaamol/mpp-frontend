import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEventsContext } from '../../contexts/eventContext'
import { Table } from '../../components/table/Table'
import { Event } from '../../models/event'
import './seeData.css'

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

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8080/events')
      if (!response.ok) {
        throw new Error('Failed ')
      }

      const eventData = await response.json() // Annotate as any[]
      const mappedEvents = eventData.map(
        (event: any) => new Event(event.id, event.name, event.price, event.type)
      )
      setEvents(mappedEvents)
    } catch (error) {
      console.error('error', error)
    }
  }

  const navigateToAddPage = () => {
    navigate('/addPage')
  }

  const handleSort = () => {
    const sortedEvents = [...events].sort((a, b) => a.getPrice() - b.getPrice())
    setEvents(sortedEvents)
  }

  const handleChart = () => {
    navigate('/chartPage')
  }

  return (
    <div className='main-container'>
      <h1>Events</h1>
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
