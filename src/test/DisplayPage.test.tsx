import { render, screen } from '@testing-library/react'
import { Home } from '../pages/seeData/seeData'
import { EventsContextProvider } from '../contexts/eventContext'
import { Event } from '../models/event'
import { BrowserRouter } from 'react-router-dom'
import { expect } from './setup'

describe('Home', () => {
  test('renders events correctly', () => {
    // Mock events data
    const events: Event[] = [
      new Event(1, 'White Party', 100, 'party'),
      new Event(2, 'Art Workshop', 100, 'workshop'),
      new Event(3, 'Fitness Workshop', 30, 'workshop'),
      new Event(4, 'Food Festival', 40, 'festival'),
      new Event(5, 'Comedy Show', 25, 'show'),
    ]

    render(
      <BrowserRouter>
        <EventsContextProvider>
          <Home />
        </EventsContextProvider>
      </BrowserRouter>
    )

    events.forEach((event) => {
      expect(screen.getByText(event.getName())).toBeInTheDocument()
      expect(screen.getByText(`${event.getPrice()}$`)).toBeInTheDocument()
    })
  })
})
