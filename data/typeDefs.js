export default `
scalar Date

type Game {
  id: Int
  home_team_id: Int
  away_team_id: Int
  date: Date
}

type GameState {
  id: Int
  game_id: Int
  home_team_score: Int
  away_team_score: Int
  broadcast: String
  quarter: Int
  time_left_in_quarter: String
  game_status: String
}

type Player {
  id: Int
  name: String
  team_id: Int
}

type PlayerStats {
  id: Int
  game_id: Int
  player_id: Int
  team_id: Int
  points: Int
  assists: Int
  rebounds: Int
  nerd: Int
}

type Team {
  id: Int
  name: String
  city: String
  full_name: String
  abbrev: String
}

type RootQuery {
  # Returns all teams
  # GET /nba/teams
  all_teams: [Team]

  # Returns just the team object of the id specified
  # GET /nba/teams/1
  team(id: Int): Team

  # Returns all players
  # GET /nba/players
  all_players: [Player]

  # Returns all players who played (i.e. had player stats) on a specific date (date format: MMDDYYYY)
  # GET /nba/players?date=01012016
  players(date: Date): [Player]

  # Returns the player object of the id specified
  # GET /nba/player/1
  player(id: Int): Player

  # Returns all player stats objects for the specified player
  # GET /nba/player/1/stats
  player_stats(id: Int): [PlayerStats]

  # Returns all games (with scores)
  # GET /nba/games
  all_games: [Game]

  # Returns all games for a given date (date format: MMDDYYYY)
  # GET /nba/games?date=01012016
  games(date: Date): [Game]

  # Returns the game objects of the id specified
  # GET /nba/games/1
  game(id: Int): Game

}

# We need to tell the server which types represent the root query.
schema {
  query: RootQuery
}
`
