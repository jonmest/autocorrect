import './teamlist.js'

/// Lets begin

let pltteams = document.querySelector('#plteams')

let cardTemplate = document.querySelector('#cardTemplate')

pltteams.addEventListener('teamselected', async event => {
  let teamData = await window.fetch(`${pltteams.getAttribute('src')}/teams/${event.detail.id}`)
  let teamDetail = await teamData.json()
  document.querySelector('#cardContainer').innerHTML = ''
  let card = cardTemplate.content.cloneNode(true)
  card.querySelector('#cardTitle').textContent = teamDetail.name
  let link = card.querySelector('#cardLink a')
  link.setAttribute('href', teamDetail.url)
  link.textContent = `${teamDetail.name}'s website >`
  document.querySelector('#cardContainer').appendChild(card)
  
})
