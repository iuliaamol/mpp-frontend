import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEventsContext } from '../../contexts/eventContext'
import { Table } from '../../components/table/Table'
import Button from '@mui/material/Button'
import './seeData.css'

export function Home() {
  const { events } = useEventsContext()
  const navigate = useNavigate()

  useEffect(() => {
    console.log('Events:', events)
  }, [events])

  const navigateToAddPage = () => {
    navigate('/addPage')
  }

  return (
    <div className='main-container'>
      <h1>Events</h1>
      <div className='container'>
        <Table events={events}></Table>
      </div>
      <button onClick={navigateToAddPage} className='add-button'>
        Add a new Event
      </button>
    </div>
  )
}
