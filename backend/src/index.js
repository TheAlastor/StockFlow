const express = require('express')
const routes = require('./routes')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.listen(3333)

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://stockflow-frontend-znkc.onrender.com'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Reservation']
  })
)
app.use(express.json())
app.use(routes)
