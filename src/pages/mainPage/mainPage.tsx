import React from 'react'
import { useNavigate } from 'react-router-dom'
import './mainPage.css'

export function MainPage() {
  const navigate = useNavigate()
  const handleLogin = () => {
    navigate('/loginPage')
  }

  const handleRegister = () => {
    navigate('/registerPage')
  }

  return (
    <div className='mainContainer'>
      <h1>Event Management System</h1>
      <div>
        <ul>
          <li>
            <button onClick={handleLogin}>Login</button>
          </li>
          <li>
            <button onClick={handleRegister}>Register</button>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default MainPage
