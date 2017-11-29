/**
 * Module for the Team class.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

 /**
  * Represents a team.
  */
class Team {
  /**
   * Creates an instance of Team.
   *
   * @param {number} id
   * @param {string} name
   * @param {string} url
   */
  constructor (id, name, url) {
    this.id = id
    this.name = name
    this.url = url
    Object.freeze(this)
  }
}

module.exports = Team
