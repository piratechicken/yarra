const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const authMiddleware = require('./middleware/auth')

const server = express()

//  Middleware
server.use(bodyParser.json())
server.use(cors())
server.use(authMiddleware.initialize)

server.use([
  require('./routes/products'),
  require('./routes/auth'),
  require('./routes/wishlist')
])

server.listen(7000, (error) => {
  if (error) {
    console.error('Error starting...', error)
  }
  else {
    console.log('Started at http://localhost:7000')
  }
})