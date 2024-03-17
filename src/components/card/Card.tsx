import './Card.css'
import { Event } from '../../models/event'
import React from 'react'

interface CardProps {
  event: Event
}

export function Card({ event }: CardProps) {
  return (
    <div className='card'>
      <div className='descr'>
        <h2>{event.getName()}</h2>
        <p>{event.getPrice()}$</p>
      </div>
    </div>
  )
}
export default Card
