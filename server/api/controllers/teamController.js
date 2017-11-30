/**
 * Module for the team controller.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

'use strict'

const Team = require('../models/Team')

/**
 * Immutable array of immutable teams.
 */
const teams = Object.freeze([
  new Team(1, 'Arsenal', 'https://www.arsenal.com'),
  new Team(4, 'Chelsea', 'https://www.chelseafc.com'),
  new Team(6, 'Crystal Palace', 'http://www.cpfc.co.uk'),
  new Team(7, 'Everton', 'http://www.evertonfc.com'),
  new Team(10, 'Liverpool', 'http://www.liverpoolfc.com'),
  new Team(11, 'Manchester City', 'https://www.mancity.com'),
  new Team(12, 'Manchester United', 'http://www.manutd.com'),
  new Team(20, 'Southampton', 'https://www.southamptonfc.com'),
  new Team(21, 'Tottenham Hotspur', 'http://www.tottenhamhotspur.com'),
  new Team(23, 'Newcastle United', 'http://www.nufc.co.uk'),
  new Team(25, 'West Ham United', 'http://www.whufc.com'),
  new Team(26, 'Leicester City', 'http://www.lcfc.com'),
  new Team(33, 'Watford', 'https://www.watfordfc.com'),
  new Team(36, 'West Bromwich Albion', 'http://www.wba.co.uk'),
  new Team(42, 'Stoke City', 'http://www.stokecityfc.com'),
  new Team(43, 'Burnley', 'https://www.burnleyfootballclub.com'),
  new Team(45, 'Swansea City', 'http://www.swanseacity.com'),
  new Team(127, 'Bournemouth', 'http://www.afcb.co.uk'),
  new Team(131, 'Brighton and Hove Albion', 'https://www.brightonandhovealbion.com'),
  new Team(159, 'Huddersfield Town', 'https://www.htafc.com')
].sort((a, b) => a.name.localeCompare(b.name)))

/**
 * Sends a JSON response containing teams (based on the search
 * criteria specified by the query parameter q).
 *
 * @param {Object} req Node.js request object
 * @param {Object} res Node.js response object
 */
module.exports.list = (req, res) => {
  console.log('\n', req.originalUrl)

  // If a query is present filter the teams.
  let result = teams
  if (req.query.q) {
    const regexp = new RegExp(req.query.q, 'i')
    result = result.filter(team => regexp.test(team.name))
  }

  // Send json response with teams - if any.
  console.log(`Found ${result.length} team${result.length !== 1 ? 's' : ''}.`)
  res.json({
    query: req.query.q,
    count: result.length,
    teams: result
  })
}

/**
 * Sends a JSON response containing a team.
 *
 * @param {Object} req Node.js request object
 * @param {Object} res Node.js response object
 */
module.exports.get = (req, res) => {
  console.log('\n', req.originalUrl)

  let id = Number(req.params.id)

  // If the parameter id isn't an integer greater than 0 send a 400 (bad request).
  if (!id || Number.isNaN(id) || !Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      status: 400,
      message: 'Bad Request'
    })
  }

  // Get the first team that's id equals the parameter id.
  let team = teams.filter(team => team.id === id).shift()

  // If no team is found send a 404 (resource not found).
  if (!team) {
    return res.status(404).json({
      status: 404,
      message: 'Not Found'
    })
  }

  // Send json response with the wanted team.
  console.log(`Found ${team.name} with id ${team.id}.`)
  res.json(team)
}
