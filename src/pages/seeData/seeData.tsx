import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEventsContext } from '../../contexts/eventContext'
import { Table } from '../../components/table/Table'
import './seeData.css'

export function Home() {
  const { events, setEvents } = useEventsContext()
  const navigate = useNavigate()

  useEffect(() => {
    console.log('Events:', events)
  }, [events])

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
