// Dependency imports
const express = require('express')

// Global variables
const app = express()

// Routes
app.use(express.static('dist'))

// Listen
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('listening on port ' + port)
})
