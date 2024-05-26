import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

export function UserEventsPage() {
  const [username, setUsername] = useState([])
  const [events, setEvents] = useState([])

  useEffect(() => {
    // Fetch user events using JWT token from local storage
    const token = localStorage.getItem('token')
    // Check if the token is provided and not null
    if (token !== null) {
      try {
        // Decode the token
        const decodedToken: any = jwtDecode(token)
        console.log(decodedToken)

        // Access the username property from the decoded token
        const username = decodedToken.sub

        console.log(username) // Print the username
        setUsername(username)
      } catch (error) {
        console.error('Error decoding token:', error)
      }
    } else {
      console.error('No JWT token provided')
    }
    const fetchUserEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/events`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log(response.data)
        setEvents(response.data)
      } catch (error) {
        console.error('Error fetching user events:', error)
      }
    }
    fetchUserEvents()
  }, [])

  return (
    <div>
      <h2>Welcome, {username}</h2>
      <h3>Your Events</h3>
      <ul>
        {events.map((event: any, index) => (
          <li key={index}>{event.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserEventsPage
