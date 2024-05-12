import { AddPage } from './pages/addDataForum/addDataForum'
import './App.css'
import { EditData } from './pages/editDataForum/editDataForum'
import { EventDetail } from './pages/detailData/detailData'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Home } from './pages/seeData/seeData'
import { EventsContextProvider } from './contexts/eventContext'
import { UsersContextProvider } from './contexts/userContext'
import { Chart } from './pages/chart/Chart'
import { MainPage } from './pages/mainPage/mainPage'
import { SeeUsers } from './pages/seeUsers/seeUsers'
import { AddUserPage } from './pages/addUserPage/addUserPage'
import { UserDetail } from './pages/detailUser/detailUser'
import { EditUser } from './pages/editUserPage/editUserPage'

function App() {
  return (
    <EventsContextProvider>
      <UsersContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<MainPage />}></Route>
            <Route path='/seeEvents' element={<Home />}></Route>
            <Route path='/seeUsers' element={<SeeUsers />}></Route>
            <Route path='/addPage' element={<AddPage />} />
            <Route path='/addUserPage' element={<AddUserPage />} />
            <Route path='/detailUserPage/:id' element={<UserDetail />} />
            <Route path='/editUserPage/:id' element={<EditUser />} />
            <Route path='/editPage/:id' element={<EditData />} />
            <Route path='/detailPage/:id' element={<EventDetail />} />
            <Route path='/chartPage' element={<Chart />} />
          </Routes>
        </BrowserRouter>
      </UsersContextProvider>
    </EventsContextProvider>
  )
}

export default App
