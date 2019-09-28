const template = document.createElement('template')
template.innerHTML = `
<input class="autocomplete" type="text" id="teamselector" list="teams">
<datalist id="teams">
</datalist>
`

class TeamSelector extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this._input = this.shadowRoot.querySelector('#teamselector')
    this._url = 'http://localhost/api'
    this._minlength = 2
    this.teams = []
  }

  static get observedAttributes () {
    return ['src', 'minlength']
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'src') {
      this._url = newValue
    } else if (name === 'minlength') {
      this._minlength = parseInt(newValue)
    }
  }

  connectedCallback () {
    this._input.addEventListener('input', async event => {
      if (this._input.value.length < this._minlength) {
        return
      }
      this.teams = await this.search(this._input.value)

      this.dispatchEvent(new window.CustomEvent('searchchanged', { details: this.teams }))

      this._updateRendering()

      let hit = this.teams.filter(team => team.name === this._input.value).shift()
      if (hit) {
        this.dispatchEvent(new window.CustomEvent('teamselected', { detail: hit }))
        this._input.blur()
        this._input.focus()
      }
    })
  }

  async search (str) {
    const searchResult = await window.fetch(`${this._url}/teams?q=${str}`)
    const teams = await searchResult.json()
    return teams.teams
  }

  _updateRendering () {
    const datalist = this.shadowRoot.querySelector('#teams')
    datalist.innerHTML = '' // Recommended method here: https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML
    for (let team of this.teams) {
      let option = document.createElement('option')
      option.setAttribute('value', team.name)
      datalist.appendChild(option)
    }
  }
}

window.customElements.define('team-selector', TeamSelector)

new TeamSelector()