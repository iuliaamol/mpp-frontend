import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { test, vi } from 'vitest'
import AddPage from '../pages/addDataForum/addDataForum'
import { BrowserRouter } from 'react-router-dom'
import { EventsContextProvider } from '../contexts/eventContext'

const { mockedUseNavigate } = vi.hoisted(() => {
  return {
    mockedUseNavigate: vi.fn(),
  }
})

vi.mock('react-router-dom', async () => {
  const router =
    await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...router,
    useNavigate: () => mockedUseNavigate,
  }
})

test('AddPage renders correctly', () => {
  render(
    <BrowserRouter>
      <EventsContextProvider>
        <AddPage />
      </EventsContextProvider>
    </BrowserRouter>
  )

  // Assert the presence of modal container
  const modalContainer = screen.getByTestId('modal-container')
  expect(modalContainer).toBeInTheDocument()

  // Assert the presence of modal
  const modal = screen.getByTestId('modal')
  expect(modal).toBeInTheDocument()

  // Assert the presence of input fields
  const nameInput = screen.getByPlaceholderText('Name')
  expect(nameInput).toBeInTheDocument()

  const priceInput = screen.getByPlaceholderText('Price')
  expect(priceInput).toBeInTheDocument()

  const typeInput = screen.getByPlaceholderText('Type')
  expect(typeInput).toBeInTheDocument()

  // Assert the presence of submit button
  const submitButton = screen.getByText('Submit')
  expect(submitButton).toBeInTheDocument()
})
