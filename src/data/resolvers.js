import {
  getTeams,
  getTeam,
  getAllPlayers,
  getPlayersByDate,
  getPlayerById,
  getPlayerStats,
  getAllGames,
  getGamesByDate,
  getGameById
} from './connectors'

import {
  dateValidator,
  idValidator
} from '../utils/validator'

// At the minimum, we need to define a resolver function for each field that
// either returns a non-scalar type or takes any arguments.
const resolvers = {
  RootQuery: {
    all_teams: () => {
      return getTeams()
    },

    team: (obj, { id }, context, info) => {
      const validId = idValidator(id)
      return (validId) ? getTeam(id) : {}
    },

    all_players: () => {
      return getAllPlayers()
    },

    players: (obj, { date }, context, info) => {
      const validDate = dateValidator(date)
      return (validDate) ? getPlayersByDate(validDate) : []
    },

    player: (obj, { id }, context, info) => {
      const validId = idValidator(id)
      return (validId) ? getPlayerById(id) : {}
    },

    player_stats: (obj, { id }, context, info) => {
      const validId = idValidator(id)
      return (validId) ? getPlayerStats(id) : {}
    },

    all_games: () => {
      return getAllGames()
    },

    games: (obj, { date }, context, info) => {
      const validDate = dateValidator(date)
      return (validDate) ? getGamesByDate(validDate) : []
    },

    game: (obj, { id }, context, info) => {
      const validId = idValidator(id)
      return (validId) ? getGameById(id) : {}
    }
  }
}

export default resolvers
