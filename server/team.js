'use strict'

var teams = []
addTeams()

function teamFactory (name, url) {
  return {name: name, url: url}
}

function addTeams () {
  teams.push(teamFactory('Tottenham hotspur', 'http://www.tottenhamhotspur.com/'))
  teams.push(teamFactory('Liverpool FC', 'http://www.liverpoolfc.com/welcome-to-liverpool-fc'))
  teams.push(teamFactory('Leicester City Football Club', 'http://www.lcfc.com/'))
  teams.push(teamFactory('Manchester United', 'http://www.manutd.com/'))
  teams.push(teamFactory('Manchester City', 'http://www.mcfc.co.uk/'))
}

function getTeams (startString) {
  startString = startString.toLowerCase()
  return teams.filter(function (current) {
    var search = current.name.toLowerCase()
    return search.startsWith(startString)
  })
}

module.exports.getTeams = getTeams
