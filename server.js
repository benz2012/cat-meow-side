// Dependency imports
const express = require('express')

// Global variables
const app = express()
const env = process.env.NODE_ENV || 'development'

// HTTP to HTTPS redirect
const forceSSL = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(301, ['https://', req.get('Host'), req.url].join(''))
  } else {
    next()
  }
}

// Routes
if (env === 'production') {
  app.use(forceSSL)
}
app.use(express.static('dist'))

// Listen
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('listening on port ' + port)
})
