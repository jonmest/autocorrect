'use strict'

/**
 * Main application file
 */

var server
var express = require('express')
var bodyParser = require('body-parser')
// read the  enviroment configuration
var app = express()

var config = {
  port: 3001
}

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type')
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET')
  res.setHeader('Content-type', 'application/json')
  next()
}
)

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', require('./proposal'))

// the http server starts
server = app.listen(config.port, function () {
  // var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://localhost:%s, ENV: %s', port, app.get('env'))
})
