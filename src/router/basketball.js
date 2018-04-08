import express from 'express'
import { graphql } from 'graphql'

import {
  gqlBasketballAllGames,
  gqlBasketballAllPlayers,
  gqlBasketballAllTeams,
  gqlBasketballGamesByDate,
  gqlBasketballGamesById,
  gqlBasketballPlayerById,
  gqlBasketballPlayersByDate,
  gqlBasketballPlayerStatsById,
  gqlBasketballTeamById
} from '../queries/index'

import {
  dateValidator,
  idValidator
} from '../utils/validator'

import { schema } from '../../server'

/*
 * Wraps the call that executes the provided graphql query.
 *
 * @param schema
 *    The GraphQL type system to use when validating and executing a query.
 * @param source
 *    A GraphQL language formatted string representing the requested operation.
 * @params [rootValue=null]
 *    The value provided as the first argument to resolver
 *    functions on the top level type (e.g. the query object type).
 * @param [variableValues=null]
 *    A mapping of variable name to runtime value to use for all variables
 *    defined in the requestString.
 * @param [operationName=null]
 *    The name of the operation to use if requestString contains multiple
 *    possible operations. Can be omitted if requestString contains only
 *    one operation.
 * @param [fieldResolver=null]
 *    A resolver function to use when one is not provided by the schema.
 *    If not provided, the default field resolver is used (which looks for a
 *    value or method on the source value with the field's name).
 *
 * @return promise
 */
const gqlQuery = (source) => {
  return graphql(schema, source, null, null, null, null)
}

var router = express.Router()

/*
 * Returns all teams.
 * GET /nba/teams
 */
router.get('/teams', (req, res) => {
  const query = gqlBasketballAllTeams()
  gqlQuery(query)
    .then(result => {
      if (result.errors) {
        throw new Error(result.errors)
      }
      res.send({ 'data': result.data })
    })
    .catch(err => {
      res.sendStatus(500)
      res.send({ 'error': err })
    })
})

/*
 * Returns just the team object of the id specified.
 * GET /nba/teams/:id
 */
router.get('/teams/:id', (req, res) => {
  const {
    id
  } = req.params

  const validId = idValidator(id)
  if (validId) {
    const query = gqlBasketballTeamById(validId)
    gqlQuery(query)
      .then(result => {
        if (result.errors) {
          throw new Error(result.errors)
        }
        res.send({ 'data': result.data })
      })
      .catch(err => {
        console.log(err)
        res.send({ 'error': err })
      })
  } else {
    res.sendStatus(422)
  }
})

/*
 * Returns all player.
 * GET /nba/players
 *
 * Returns all players who played (i.e. had player stats) on a specific date (date format: MMDDYYYY)
 * GET /nba/players?date=:date
 */
router.get('/players', (req, res) => {
  const {
    date
  } = req.query

  // Handle a date querystring parameter.
  if (date !== undefined) {
    const validDate = dateValidator(date)
    if (validDate === false) {
      res.sendStatus(422)
    } else {
      const query = gqlBasketballPlayersByDate(validDate)
      gqlQuery(query)
        .then(result => {
          if (result.errors) {
            throw new Error(result.errors)
          }
          res.send({ 'data': result.data })
        })
        .catch(err => {
          res.sendStatus(500)
          res.send({ 'error': err })
        })
    }
  } else {
    const query = gqlBasketballAllPlayers()
    gqlQuery(query)
      .then(result => {
        if (result.errors) {
          throw new Error(result.errors)
        }
        res.send({ 'data': result.data })
      })
      .catch(err => {
        res.sendStatus(500)
        res.send({ 'error': err })
      })
  }
})

/*
 * Returns the player object of the id specified.
 * GET /nba/player/:id
 */
router.get('/player/:id', (req, res) => {
  const {
    id
  } = req.params

  const validId = idValidator(id)
  if (validId) {
    const query = gqlBasketballPlayerById(validId)
    gqlQuery(query)
      .then(result => {
        if (result.errors) {
          throw new Error(result.errors)
        }
        res.send({ 'data': result.data })
      })
      .catch(err => {
        res.sendStatus(500)
        res.send({ 'error': err })
      })
  } else {
    res.sendStatus(422)
  }
})

/*
 * Returns all player stats objects for the specified player.
 * GET /nba/player/:id/stats
 */
router.get('/player/:id/stats', (req, res) => {
  const {
    id
  } = req.params

  const validId = idValidator(id)
  if (validId) {
    const query = gqlBasketballPlayerStatsById(validId)
    gqlQuery(query)
      .then(result => {
        if (result.errors) {
          throw new Error(result.errors)
        }
        res.send({ 'data': result.data })
      })
      .catch(err => {
        res.sendStatus(500)
        res.send({ 'error': err })
      })
  } else {
    res.sendStatus(422)
  }
})

/*
 * Returns all games (with scores)
 * GET /nba/games
 *
 * Returns all games for a given date (date format: MMDDYYYY)
 * GET /nba/games?date=:date
 */
router.get('/games', (req, res) => {
  const {
    date
  } = req.query

  if (date !== undefined) {
    const validDate = dateValidator(date)
    if (!validDate) {
      res.sendStatus(422)
    } else {
      const query = gqlBasketballGamesByDate(validDate)
      gqlQuery(query)
        .then(result => {
          if (result.errors) {
            throw new Error(result.errors)
          }
          res.send({ 'data': result.data })
        })
        .catch(err => {
          res.sendStatus(500)
          res.send({ 'error': err })
        })
    }
  } else {
    const query = gqlBasketballAllGames()
    gqlQuery(query)
      .then(result => {
        if (result.errors) {
          throw new Error(result.errors)
        }
        res.send({ 'data': result.data })
      })
      .catch(err => {
        res.sendStatus(500)
        res.send({ 'error': err })
      })
  }
})

/*
 * Returns the game objects of the id specified
 * GET /nba/games/:id
 */
router.get('/games/:id', (req, res) => {
  const {
    id
  } = req.params

  const validId = idValidator(id)
  if (validId) {
    const query = gqlBasketballGamesById(validId)
    gqlQuery(query)
      .then(result => {
        if (result.errors) {
          throw new Error(result.errors)
        }
        res.send({ 'data': result.data })
      })
      .catch(err => {
        res.sendStatus(500)
        res.send({ 'error': err })
      })
  } else {
    res.sendStatus(422)
  }
})

module.exports = router
