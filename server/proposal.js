'use strict'

var express = require('express')
var router = express.Router()
var team = require('./team.js')

/**
 * called when server get a POST request to /teams
 */
router.post('/teams', function (req, res) {
    // must be application/json or post data
  var searchString = req.body.query
  console.log('Got search string: ', searchString)

  if (!searchString || searchString.length === 0) {
    return res.sendStatus(400)
  }

    // build object to return
  var obj = {}
  obj.searchString = searchString
  obj.match = team.getTeams(searchString)

  res.send(JSON.stringify(obj))
})

module.exports = router
