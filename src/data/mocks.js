import casual from 'casual'

casual.define('game', function () {
  return {
    id: casual.integer(1, 10),
    home_team_id: casual.integer(1, 10),
    away_team_id: casual.integer(1, 10),
    date: casual.date(format = 'MM/DD/YYYY') // eslint-disable-line
  }
})

casual.define('gameState', function () {
  return {
    id: casual.integer(1, 10),
    game_id: casual.integer(1, 10),
    home_team_score: casual.integer(0, 150),
    away_team_score: casual.integer(0, 150),
    broadcast: casual.random_element(['ESPN', 'TNT', 'ROOT', 'ESPN3']),
    quarter: casual.integer(1, 4),
    time_left_in_quarter: casual.time(format = 'mm:ss'), // eslint-disable-line
    game_status: casual.random_element(['IN_PROGRESS', 'FINAL'])
  }
})

casual.define('player', function () {
  return {
    id: casual.integer(1, 10),
    name: casual.full_name,
    team_id: casual.integer(1, 10)
  }
})

casual.define('playerStats', function () {
  return {
    id: casual.integer(1, 10),
    game_id: casual.integer(1, 10),
    player_id: casual.integer(1, 10),
    team_id: casual.integer(1, 10),
    points: casual.integer(0, 100),
    assists: casual.integer(0, 100),
    rebounds: casual.integer(0, 100),
    nerd: casual.integer(-100, 100)
  }
})

casual.define('team', function () {
  return {
    id: casual.integer(1, 10),
    name: casual.title,
    city: casual.city,
    full_name: casual.title,
    abbrev: casual.letter
  }
})

const mocks = {
  // Mock resolvers.
  Query: () => ({
    all_teams: (root, args) => {
      return [{
        id: args.id,
        name: args.name,
        city: args.city,
        full_name: args.full_name,
        abbrev: args.abbrev
      }]
    },

    team: (root, args) => {
      return {
        id: args.id,
        name: args.name,
        city: args.city,
        full_name: args.full_name,
        abbrev: args.abbrev
      }
    },

    all_players: (root, args) => {
      return [{
        id: args.id,
        name: args.name,
        team_id: args.team_id
      }]
    },

    players: (root, args) => {
      return [{
        id: args.id,
        name: args.name,
        team_id: args.team_id
      }]
    },

    player: (root, args) => {
      return {
        id: args.id,
        name: args.name,
        team_id: args.team_id
      }
    },

    player_stats: (root, args) => {
      return [{
        id: args.id,
        game_id: args.game_id,
        player_id: args.player_id,
        team_id: args.team_id,
        points: args.points,
        assists: args.assists,
        rebounds: args.rebounds,
        nerd: args.nerd
      }]
    },

    all_games: (root, args) => {
      return [{
        id: args.id,
        home_team_id: args.home_team_id,
        away_team_id: args.away_team_id,
        date: args.date
      }]
    },

    games: (root, args) => {
      return [{
        id: args.id,
        home_team_id: args.home_team_id,
        away_team_id: args.away_team_id,
        date: args.date
      }]
    },

    game: (root, args) => {
      return {
        id: args.id,
        home_team_id: args.home_team_id,
        away_team_id: args.away_team_id,
        date: args.date
      }
    }
  }),

  // Mock types.
  Game: () => (casual.game),
  GameState: () => (casual.gameState),
  Player: () => (casual.player),
  PlayerStats: () => (casual.playerStats),
  Team: () => (casual.team)
}

export default mocks
