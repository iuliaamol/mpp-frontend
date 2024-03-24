import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Table } from '../components/table/Table'
import { Event } from '../models/event'

describe('Table component', () => {
  const events: Event[] = [
    new Event(1, 'Event 1', 50, 'type1'),
    new Event(2, 'Event 2', 75, 'type2'),
    new Event(3, 'Event 3', 100, 'type3'),
  ]

  test('renders table with events', () => {
    render(
      <BrowserRouter>
        <Table events={events} />
      </BrowserRouter>
    )

    // Assert that each event is rendered in the table
    events.forEach((event) => {
      expect(screen.getByText(event.getName())).toBeInTheDocument()
      expect(screen.getByText(`${event.getPrice()}$`)).toBeInTheDocument()
    })
  })

  test('clicking on edit button navigates to edit page', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Table events={events} />
      </BrowserRouter>
    )

    // Click on the edit button of the first event
    fireEvent.click(getByTestId('edit-btn-1'))

    // Assert that the correct URL is navigated to
    expect(window.location.href).toContain('/editPage/1')
  })

  test('clicking on delete button opens modal', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Table events={events} />
      </BrowserRouter>
    )

    fireEvent.click(getByTestId('delete-btn-1'))

    expect(screen.getByTestId('modal')).toBeInTheDocument()
  })
})
