const express = require('express')
const bodyParser = require('body-parser')

// Set up Express
const app = express()

// Initialize bodyParser
app.use(bodyParser.json({limit: '10mb', extended: true}))

// Initialize routes
app.use('/api', require('./routes/api'))

// Run server
app.listen(3000)

module.exports = app