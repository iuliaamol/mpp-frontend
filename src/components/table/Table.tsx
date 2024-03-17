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
            <th>Actions</th>
          </tr>
        </thead>
        <body>
          {events.map((event) => (
            <tr key={event.getId()}>
              <td>{event.getName()}</td>
              <td>{event.getPrice()}</td>
              <td>
                <span>
                  <BsFillTrashFill />
                  <BsFillPencilFill />
                </span>
              </td>
            </tr>
          ))}
        </body>
      </table>
    </div>
  )
}
