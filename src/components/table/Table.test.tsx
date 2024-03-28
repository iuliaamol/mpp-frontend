import { render } from '@testing-library/react'
import { Table } from './Table'
import { vi } from 'vitest'

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}))

describe('Table', () => {
  it('should render the table component', () => {
    const result = render(<Table events={[]} />)
    expect
  })
})
