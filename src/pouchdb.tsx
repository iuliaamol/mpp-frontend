// src/pouchdb.js
import PouchDB from 'pouchdb-browser'
import { Event } from './models/event'
import { User } from './models/user'
import axios from 'axios'

export const eventsDb = new PouchDB<Event>('events')
export const usersDb = new PouchDB<User>('users')

const syncEvents = async () => {
  try {
    const allEvents = await eventsDb.allDocs({ include_docs: true })
    const eventsToSync = allEvents.rows.map((row) => row.doc)

    if (eventsToSync.length > 0) {
      await axios.post('http://localhost:8080/sync/events', eventsToSync)
      console.log('Events synchronized successfully')
    }
  } catch (error) {
    console.error('Error syncing events:', error)
  }
}

const syncUsers = async () => {
  try {
    const allUsers = await usersDb.allDocs({ include_docs: true })
    const usersToSync = allUsers.rows.map((row) => row.doc)

    if (usersToSync.length > 0) {
      await axios.post('http://localhost:8080/sync/users', usersToSync)
      console.log('Users synchronized successfully')
    }
  } catch (error) {
    console.error('Error syncing users:', error)
  }
}

// Call these functions when the application comes online
window.addEventListener('online', syncEvents)
window.addEventListener('online', syncUsers)
