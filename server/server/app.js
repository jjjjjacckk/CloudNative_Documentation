const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const corsOptions = {
    // origin: [
    //   'http://localhost:8080',
    // ],
    origin: "*",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

const db = require('./db')
const movieRouter = require('./routes/router')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors(corsOptions))
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', movieRouter)

module.exports = app;