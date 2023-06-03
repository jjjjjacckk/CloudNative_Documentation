const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Workspace = require('./models/workspace')
const corsOptions = {
    // origin: [
    //   'http://localhost:8080',
    // ],
    origin: "*",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

const db = require('./db')
const Router = require('./routes/router')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors(corsOptions))
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

createPublicWorkspace()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', Router)

module.exports = app;

//////////////////////////////////////////// create public workspace
async function createPublicWorkspace() {
  
  const body = {name: "Public"}

  const workspace = new Workspace(body)

  if (!workspace) {
      console.count('error: ' + err)
  }

  try {
      const oldWorkspace = await Workspace.findOne({ name: workspace.name }).exec()
      if (!oldWorkspace) {
        console.log('create public workspace')
        await workspace.save()
      }

    } catch (error) {
      console.count('error: ' + error)
    }
}