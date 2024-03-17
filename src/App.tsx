import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Event } from './models/event'
import { AddPage } from './pages/addDataForum/addDataForum'
import './App.css'
import { EditData } from './pages/editDataForum/editDataForum'

import { Table } from './components/table/Table'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Home } from './pages/seeData/seeData'
import { EventsContextProvider } from './contexts/eventContext'

function App() {
  return (
    <EventsContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/addPage' element={<AddPage />} />
          <Route path='/editPage/:id' element={<EditData />} />
        </Routes>
      </BrowserRouter>
    </EventsContextProvider>
  )
}

export default App
