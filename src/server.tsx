const express = require('express')
const cors = require('cors')
const mysql = require('mysql')

const app = express()

// Enable CORS for all routes
app.use(cors())

// Define your routes here
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'eventDB',
})

app.listen(8080, () => {
  console.log('Server is running on port 8080')
})
app.use(cors())
