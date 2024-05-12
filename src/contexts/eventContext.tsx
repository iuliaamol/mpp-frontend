import React, { createContext, useState, useContext, useEffect } from 'react'
import { Event } from '../models/event'
import axios from 'axios'

// Define the shape of your context
interface EventsContextType {
  events: Event[]
  addEvent: (newEvent: Event) => void
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>
}

// Create the context object
export const EventsContext = createContext<EventsContextType | null>(null)

// Define a provider component
interface EventsContextProviderProps {
  children: React.ReactNode
}

export function EventsContextProvider({
  children,
}: EventsContextProviderProps) {
  const [events, setEvents] = useState<Event[]>([])

  // Function to add an event to the list
  const addEvent = (newEvent: Event) => {
    setEvents((prevEvents) => [...prevEvents, newEvent])
  }
  const updateEvents = (updatedEvents: Event[]) => {
    setEvents(updatedEvents)
  }

  // Fetch events from backend when component mounts
  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/events')
      // if (!response.ok) {
      //   throw new Error('Failed to fetch events')
      // }
      // const data = await response.json()

      setEvents(response.data)
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching events:', error)
    }
  }

  const eventsContextValue: EventsContextType = {
    events,
    addEvent,
    setEvents: function (value: React.SetStateAction<Event[]>): void {
      // Update the events array with the new value
      setEvents(value)
    },
  }

  return (
    <EventsContext.Provider value={eventsContextValue}>
      {children}
    </EventsContext.Provider>
  )
}

// Custom hook to use the events context
export const useEventsContext = () => {
  const context = useContext(EventsContext)
  if (!context) {
    throw new Error(
      'useEventsContext must be used within an EventsContextProvider'
    )
  }
  return context
}
