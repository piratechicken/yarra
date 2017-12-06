const express = require('express')
const bodyParser = require('body-parser')
// const cors = require('cors')

const server = express()

// server.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// server.use(cors())

//  Middleware
server.use(bodyParser.json())

server.use([
  require('./routes/products')
])

server.listen(7000, (error) => {
  if (error) {
    console.error('Error starting...', error)
  }
  else {
    console.log('Started at http://localhost:7000')
  }
})