import { Link } from 'react-router-dom'
import './Button.css'

export function Button() {
  return (
    <>
      <button className='button'>
        <Link to='/addPage'>Add a new event</Link>{' '}
      </button>
    </>
  )
}
