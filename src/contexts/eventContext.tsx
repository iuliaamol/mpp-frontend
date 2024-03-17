import React, { createContext, useState, useContext } from 'react'
import { Event } from '../models/event'

// Define the shape of your context
interface EventsContextType {
  events: Event[]
  addEvent: (newEvent: Event) => void
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
  const [events, setEvents] = useState<Event[]>([
    new Event(1, 'White Party', 100, 'party'),
    new Event(2, 'Art Workshop', 100, 'workshop'),
    new Event(3, 'Fitness Workshop', 30, 'workshop'),
    new Event(4, 'Food Festival', 40, 'festival'),
    new Event(5, 'Comedy Show', 25, 'show'),
  ])

  // Function to add an event to the list
  const addEvent = (newEvent: Event) => {
    setEvents((prevEvents) => [...prevEvents, newEvent])
  }

  const eventsContextValue: EventsContextType = {
    events,
    addEvent,
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
      'useEventsContext must be used within a EventsContextProvider'
    )
  }
  return context
}
