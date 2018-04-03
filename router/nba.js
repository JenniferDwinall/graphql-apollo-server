import express from 'express'
import { graphql } from 'graphql'

import {
  gqlNbaAllGames,
  gqlNbaAllPlayers,
  gqlNbaAllTeams,
  gqlNbaGamesByDate,
  gqlNbaGamesById,
  gqlNbaPlayerById,
  gqlNbaPlayersByDate,
  gqlNbaPlayerStatsById,
  gqlNbaTeamById
} from '../queries/index'

import { schema } from '../server'

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
  const query = gqlNbaAllTeams()
  gqlQuery(query)
    .then(result => {
      res.send(result.data.all_teams)
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
})

/*
 * Returns just the team object of the id specified.
 * GET /nba/teams/1
 */
router.get('/team/:id', (req, res) => {
  const {
    id
  } = req.params

  const query = gqlNbaTeamById(id)
  gqlQuery(query)
    .then(result => {
      res.send(result.data.team)
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
})

/*
 * Returns all player.
 * GET /nba/players
 *
 * Returns all players who played (i.e. had player stats) on a specific date (date format: MMDDYYYY)
 * GET /nba/players?date=01012016
 */
router.get('/players', (req, res) => {
  const {
    date
  } = req.query

  if (date) {
    const query = gqlNbaPlayersByDate(date)
    gqlQuery(query)
      .then(result => {
        res.send(result.data.players)
      })
      .catch(err => {
        console.log(err)
        res.sendStatus(500)
      })
  } else {
    const query = gqlNbaAllPlayers()
    gqlQuery(query)
      .then(result => {
        res.send(result.data.all_players)
      })
      .catch(err => {
        console.log(err)
        res.sendStatus(500)
      })
  }
})

/*
 * Returns all players who played (i.e. had player stats) on a specific date (date format: MMDDYYYY)
 * GET /nba/players/01012016
 */
router.get('/players/:date', (req, res) => {
  const {
    date
  } = req.params

  const query = gqlNbaPlayersByDate(date)
  gqlQuery(query)
    .then(result => {
      res.send(result.data.players)
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
})

/*
 * Returns the player object of the id specified.
 * GET /nba/player/1
 */
router.get('/player/:id', (req, res) => {
  const {
    id
  } = req.params

  const query = gqlNbaPlayerById(id)
  gqlQuery(query)
    .then(result => {
      res.send(result.data.player)
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
})

/*
 * Returns all player stats objects for the specified player.
 * GET /nba/player/1/stats
 */
router.get('/player/:id/stats', (req, res) => {
  const {
    id
  } = req.params

  const query = gqlNbaPlayerStatsById(id)
  gqlQuery(query)
    .then(result => {
      res.send(result.data.player_stats)
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
})

/*
 * Returns all games (with scores)
 * GET /nba/games
 *
 * Returns all games for a given date (date format: MMDDYYYY)
 * GET /nba/games?date=01012016
 */
router.get('/games', (req, res) => {
  const {
    date
  } = req.query

  if (date) {
    const query = gqlNbaGamesByDate()
    gqlQuery(query)
      .then(result => {
        res.send(result.data.games)
      })
      .catch(err => {
        console.log(err)
        res.sendStatus(500)
      })
  } else {
    const query = gqlNbaAllGames()
    gqlQuery(query)
      .then(result => {
        res.send(result.data.all_games)
      })
      .catch(err => {
        console.log(err)
        res.sendStatus(500)
      })
  }
})

/*
 * Returns all games for a given date (date format: MMDDYYYY)
 * GET /nba/games?date=01012016
 */
router.get('/game/:date', (req, res) => {
  const {
    date
  } = req.params

  const query = gqlNbaGamesByDate(date)
  gqlQuery(query)
    .then(result => {
      res.send(result.data.games)
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
})

/*
 * Returns the game objects of the id specified
 * GET /nba/games/1
 */
router.get('/games/:id', (req, res) => {
  const {
    id
  } = req.params

  const query = gqlNbaGamesById(id)
  gqlQuery(query)
    .then(result => {
      res.send(result.data.game)
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
})

module.exports = router
