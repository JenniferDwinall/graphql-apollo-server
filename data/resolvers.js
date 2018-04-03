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

// At the minimum, we need to define a resolver function for each field that
// either returns a non-scalar type or takes any arguments.
const resolvers = {
  RootQuery: {
    all_teams: () => {
      return getTeams()
    },

    team: (obj, { id }, context, info) => {
      return getTeam(id)
    },

    all_players: () => {
      return getAllPlayers()
    },

    players: (obj, { date }, context, info) => {
      return getPlayersByDate(date)
    },

    player: (obj, { id }, context, info) => {
      return getPlayerById(id)
    },

    player_stats: (obj, { id }, context, info) => {
      return getPlayerStats(id)
    },

    all_games: () => {
      return getAllGames()
    },

    games: (obj, { date }, context, info) => {
      return getGamesByDate(date)
    },

    game: (obj, { id }, context, info) => {
      return getGameById(id)
    }
  }
}

export default resolvers
