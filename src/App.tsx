import { AddPage } from './pages/addDataForum/addDataForum'
import './App.css'
import { EditData } from './pages/editDataForum/editDataForum'
import { EventDetail } from './pages/detailData/detailData'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Home } from './pages/seeData/seeData'
import { EventsContextProvider } from './contexts/eventContext'
import { Chart } from './pages/chart/Chart'

function App() {
  return (
    <EventsContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/addPage' element={<AddPage />} />
          <Route path='/editPage/:id' element={<EditData />} />
          <Route path='/detailPage/:id' element={<EventDetail />} />
          <Route path='/chartPage' element={<Chart />} />
        </Routes>
      </BrowserRouter>
    </EventsContextProvider>
  )
}

export default App
