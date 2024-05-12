import React from 'react'
import { useNavigate } from 'react-router-dom'

export function MainPage() {
  const navigate = useNavigate()
  const handleSeeEvents = () => {
    navigate('/seeEvents')
  }

  const handleSeeUsers = () => {
    navigate('/seeUsers')
  }

  return (
    <div>
      <h1>Event Management System</h1>
      <div>
        <ul>
          <li>
            <button onClick={handleSeeEvents}>See Events</button>
          </li>
          <li>
            <button onClick={handleSeeUsers}>See Users</button>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default MainPage