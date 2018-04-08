import 'isomorphic-fetch' /* global fetch */

const FILE_LOCATION = 'http://localhost:3000/static/files'
const FILE_GAMES = `${FILE_LOCATION}/games.json`
// const FILE_GAME_STATE = `${FILE_LOCATION}/game_state.json`
const FILE_PLAYERS = `${FILE_LOCATION}/players.json`
const FILE_PLAYER_STATS = `${FILE_LOCATION}/player_stats.json`
const FILE_TEAMS = `${FILE_LOCATION}/teams.json`

/*
 * Returns all teams.
 *
 * @return {Array} - An array of team objects.
 */
export const getTeams = async () => {
  const response = await fetch(FILE_TEAMS)
  return response.json()
}

/*
 * Returns just the team object of the id specified.
 *
 * @param id {Integer} - The team id.
 *
 * @return {Array} - An array containing the team object.
 */
export const getTeam = async (id) => {
  const response = await fetch(FILE_TEAMS)
  const json = await response.json()
  const data = json.filter((elem, index, arr) => elem.id === id)
  return data[0]
}

/*
 * Returns all players.
 *
 * @return {Array} - An array of player objects.
 */
export const getAllPlayers = async () => {
  const response = await fetch(FILE_PLAYERS)
  return response.json()
}

/*
 * Returns all players who played (i.e. had player stats) on a specific date (date format: MM/DD/YYYY)
 *
 * @param {Date} - The specified date.
 *
 * @return {Array} - An array of player objects.
 */
export const getPlayersByDate = async (date) => {
  const games = await getGamesByDate(date)
  const gameIds = games.map(game => game.id)
  return getPlayersStatsByGame(gameIds)
}

/*
 * Returns the player object of the id specified.
 *
 * @param id {Integer} - The specified player id.
 *
 * @return {Object} - The player object.
 */
export const getPlayerById = async (id) => {
  const response = await fetch(FILE_PLAYERS)
  const json = await response.json()
  const data = json.filter((elem, index, arr) => id === elem.id)
  return data[0]
}

/*
 * Returns the player object of the id specified.
 *
 * @param ids {Array} - An array of player ids.
 *
 * @return {Array} - An array of player objects.
 */
export const getPlayersByIds = async (ids) => {
  const response = await fetch(FILE_PLAYERS)
  const json = await response.json()
  return json.filter((elem, index, arr) => ids.includes(elem.id))
}

/*
 * Returns all player stats objects for the specified player
 *
 * @param {Integer} - The specified player id.
 *
 * @return {Array} - An array of player stats objects.
 */
export const getPlayerStats = async (id) => {
  const response = await fetch(FILE_PLAYER_STATS)
  const json = await response.json()
  return json.filter((elem, index, arr) => id === elem.player_id)
}

/*
 * Returns all games (with scores).
 *
 * @return {Array} - An array of game objects.
 */
export const getAllGames = async () => {
  const response = await fetch(FILE_GAMES)
  return response.json()
}

/*
 * Returns all games for a given date (date format: MMDDYYYY)
 *
 * @param {Date} - The specified date.
 *
 * @return {Array} - An array of game objects.
 */
export const getGamesByDate = async (date) => {
  const response = await fetch(FILE_GAMES)
  const json = await response.json()
  // @TODO: Currently string matching the date.  Change this to work with all (reasonable) date formats.
  return json.filter((elem, index, arr) => elem.date === date)
}

/*
 * Returns the game object of the id specified.
 *
 * @param id {Integer} - The specified id.
 *
 * @return {Array} - An array containing the game object.
 */
export const getGameById = async (id) => {
  const response = await fetch(FILE_GAMES)
  const json = await response.json()
  const data = json.filter((elem, index, arr) => elem.id === id)
  return data[0]
}

/*
 * Returns all player stats for a specified game.
 *
 * @param ids {Array} - An array of game ids.
 *
 * @return {Array} - An array of player stats objects.
 */
export const getPlayersStatsByGame = async (ids) => {
  const response = await fetch(FILE_PLAYER_STATS)
  const json = await response.json()
  const gameData = json.filter((elem, index, arr) => ids.includes(elem.game_id))
  const playerIds = gameData.map((data) => data.player_id)
  return getPlayersByIds(playerIds)
}
