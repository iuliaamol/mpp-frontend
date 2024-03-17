import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Event } from '../../models/event'
import { Card } from '../../components/card/Card'
import { Button } from '../../components/button/Button'
import { Link } from 'react-router-dom'
import { AddPage } from '../addDataForum/addDataForum'
import { EventsContext, useEventsContext } from '../../contexts/eventContext'
import { Table } from '../../components/table/Table'

export function Home() {
  const { events } = useEventsContext()

  useEffect(() => {
    console.log('Events:', events)
  }, [events])

  return (
    <div className='main-container'>
      <h1>Evenimente</h1>
      <div className='container'>
        <Table events={events}></Table>
      </div>
      <Button></Button>
    </div>
  )
}
