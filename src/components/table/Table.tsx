import React from 'react'
import { Event } from '../../models/event'
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs'
import './Table.css'

interface TableProps {
  events: Event[]
}

export function Table({ events }: TableProps) {
  return (
    <div className='table-wrapper'>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <body>
          {events.map((event) => (
            <tr key={event.getId()}>
              <td>{event.getName()}</td>
              <td>{event.getPrice()}$</td>
              <td>
                <span className='actions'>
                  <BsFillTrashFill className='delete-btn' />
                  <BsFillPencilFill className='edit-btn' />
                </span>
              </td>
            </tr>
          ))}
        </body>
      </table>
    </div>
  )
}
