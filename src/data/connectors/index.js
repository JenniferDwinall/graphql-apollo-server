import 'isomorphic-fetch' /* global fetch */

import { ErrorFileNotFound } from './errors'
import {
  GenericError,
  InvalidSourceFileError
} from '../errors'

const FILE_LOCATION = 'http://localhost:3000/static/files'
const FILE_GAMES = `${FILE_LOCATION}/games.json`
const FILE_GAME_STATE = `${FILE_LOCATION}/game_state.json`
const FILE_PLAYERS = `${FILE_LOCATION}/players.json`
const FILE_PLAYER_STATS = `${FILE_LOCATION}/player_stats.json`
const FILE_TEAMS = `${FILE_LOCATION}/teams.json`

/*
 * Returns all teams.
 *
 * @return {Array} - An array of team objects.
 */
export const getTeams = async () => {
  return await fetch(FILE_TEAMS)
    .then(response => {
      if (!response.ok) {
        throw new ErrorFileNotFound(response.statusText)
      }
      return response.json()
    })
    .catch(err => {
      return (err.name === 'ErrorFileNotFound') ? InvalidSourceFileError : GenericError
    })
}

/*
 * Returns just the team object of the id specified.
 *
 * @param id {Integer} - The team id.
 *
 * @return {Array} - An array containing the team object.
 */
export const getTeam = async (id) => {
  return await fetch(FILE_TEAMS)
    .then(response => {
      if (!response.ok) {
        throw new ErrorFileNotFound(response.statusText)
      }
      return response.json()
    })
    .then(json => {
      const data = json.filter((elem, index, arr) => elem.id === id)
      return data[0]
    })
    .catch(err => {
      return (err.name === 'ErrorFileNotFound') ? InvalidSourceFileError : GenericError
    })
}

/*
 * Returns all players.
 *
 * @return {Array} - An array of player objects.
 */
export const getAllPlayers = async () => {
  return await fetch(FILE_PLAYERS)
    .then(response => {
      if (!response.ok) {
        throw new ErrorFileNotFound(response.statusText)
      }
      return response.json()
    })
    .catch(err => {
      return (err.name === 'ErrorFileNotFound') ? InvalidSourceFileError : GenericError
    })
}

/*
 * Returns all players who played (i.e. had player stats) on a specific date (date format: MM/DD/YYYY)
 *
 * @param {Date} - The specified date.
 *
 * @return {Array} - An array of player objects.
 */
export const getPlayersByDate = async (date) => {
  return await getGamesByDate(date)
    .then(games => {
      const gameIds = games.map(game => game.id)
      return getPlayersStatsByGame(gameIds)
    })
    .catch(err => {
      return (err.name === 'ErrorFileNotFound') ? InvalidSourceFileError : GenericError
    })
}

/*
 * Returns the player object of the id specified.
 *
 * @param id {Integer} - The specified player id.
 *
 * @return {Object} - The player object.
 */
export const getPlayerById = async (id) => {
  return await fetch(FILE_PLAYERS)
    .then(response => {
      if (!response.ok) {
        throw new ErrorFileNotFound(response.statusText)
      }
      return response.json()
    })
    .then(json => {
      const data = json.filter((elem, index, arr) => id === elem.id)
      return data[0]
    })
    .catch(err => {
      return (err.name === 'ErrorFileNotFound') ? InvalidSourceFileError : GenericError
    })
}

/*
 * Returns an array of players objects of the ids specified.
 *
 * @param ids {Array} - An array of player ids.
 *
 * @return {Array} - An array of player objects.
 */
export const getPlayersByIds = async (ids) => {
  return await fetch(FILE_PLAYERS)
    .then(response => {
      if (!response.ok) {
        throw new ErrorFileNotFound(response.statusText)
      }
      return response.json()
    })
    .then(json => {
      return json.filter((elem, index, arr) => ids.includes(elem.id))
    })
    .catch(err => {
      return (err.name === 'ErrorFileNotFound') ? InvalidSourceFileError : GenericError
    })
}

/*
 * Returns all player stats objects for the specified player
 *
 * @param {Integer} - The specified player id.
 *
 * @return {Array} - An array of player stats objects.
 */
export const getPlayerStats = async (id) => {
  return await fetch(FILE_PLAYER_STATS)
    .then(response => {
      if (!response.ok) {
        throw new ErrorFileNotFound(response.statusText)
      }
      return response.json()
    })
    .then(json => {
      return json.filter((elem, index, arr) => id === elem.player_id)
    })
    .catch(err => {
      return (err.name === 'ErrorFileNotFound') ? InvalidSourceFileError : GenericError
    })
}

/*
 * Returns all games (with scores).
 *
 * @return {Array} - An array of game objects.
 */
export const getAllGames = async () => {
  return await fetch(FILE_GAMES)
    .then(response => {
      if (!response.ok) {
        throw new ErrorFileNotFound(response.statusText)
      }
      return response.json()
    })
    .then(json => {

    })
    .catch(err => {
      return (err.name === 'ErrorFileNotFound') ? InvalidSourceFileError : GenericError
    })
}

/*
 * Returns all games with scores.
 *
 * @return {Array} - An array of game objects.
 */
export const getAllGamesWithScores = async () => {
  return await fetch(FILE_GAME_STATE)
    .then(response => {
      if (!response.ok) {
        throw new ErrorFileNotFound(response.statusText)
      }
      return response.json()
    })
    .then(json => {
      const gameIds = json.map((data) => data.game_id)
      return getGamesByIds(gameIds)
    })
    .catch(err => {
      return (err.name === 'ErrorFileNotFound') ? InvalidSourceFileError : GenericError
    })
}

/*
 * Returns all games for a given date (date format: MMDDYYYY)
 *
 * @param {Date} - The specified date.
 *
 * @return {Array} - An array of game objects.
 */
export const getGamesByDate = async (date) => {
  return await fetch(FILE_GAMES)
    .then(response => {
      if (!response.ok) {
        throw new ErrorFileNotFound(response.statusText)
      }
      return response.json()
    })
    .then(json => {
      return json.filter((elem, index, arr) => elem.date === date)
    })
    .catch(err => {
      return (err.name === 'ErrorFileNotFound') ? InvalidSourceFileError : GenericError
    })
}

/*
 * Returns the game object of the id specified.
 *
 * @param id {Integer} - The specified id.
 *
 * @return {Array} - An array containing the game object.
 */
export const getGameById = async (id) => {
  return await fetch(FILE_GAMES)
    .then(response => {
      if (!response.ok) {
        throw new ErrorFileNotFound(response.statusText)
      }
      return response.json()
    })
    .then(json => {
      const data = json.filter((elem, index, arr) => elem.id === id)
      return data[0]
    })
    .catch(err => {
      return (err.name === 'ErrorFileNotFound') ? InvalidSourceFileError : GenericError
    })
}

/*
 * Returns an array of games objects of the ids specified.
 *
 * @param ids {Array} - An array of game ids.
 *
 * @return {Array} - An array of games objects.
 */
export const getGamesByIds = async (ids) => {
  return await fetch(FILE_GAMES)
    .then(response => {
      if (!response.ok) {
        throw new ErrorFileNotFound(response.statusText)
      }
      return response.json()
    })
    .then(json => {
      return json.filter((elem, index, arr) => ids.includes(elem.id))
    })
    .catch(err => {
      return (err.name === 'ErrorFileNotFound') ? InvalidSourceFileError : GenericError
    })
}

/*
 * Returns all player stats for a specified game.
 *
 * @param ids {Array} - An array of game ids.
 *
 * @return {Array} - An array of player stats objects.
 */
export const getPlayersStatsByGame = async (ids) => {
  return await fetch(FILE_PLAYER_STATS)
    .then(response => {
      if (!response.ok) {
        throw new ErrorFileNotFound(response.statusText)
      }
      return response.json()
    })
    .then(json => {
      const gameData = json.filter((elem, index, arr) => ids.includes(elem.game_id))
      const playerIds = gameData.map((data) => data.player_id)
      return getPlayersByIds(playerIds)
    })
    .catch(err => {
      return (err.name === 'ErrorFileNotFound') ? InvalidSourceFileError : GenericError
    })
}
