export const gqlNbaAllGames = () => { return `{all_games {id,home_team_id,away_team_id,date}}` }
export const gqlNbaAllPlayers = () => { return `{all_players {id,name,team_id}}` }
export const gqlNbaAllTeams = () => { return `{all_teams{id,city,name,full_name,abbrev}}` }
export const gqlNbaGamesByDate = (date) => { return `{games(date:${date}){id,home_team_id,away_team_id,date}}}` }
export const gqlNbaGamesById = (id) => { return `{game(id:${id}){id,home_team_id,away_team_id,date}}}` }
export const gqlNbaPlayerById = (id) => { return `{player(id:${id}) {id,name,team_id}}` }
export const gqlNbaPlayersByDate = (date) => { return `{players(date: ${date}) {id,name,team_id}}` }
export const gqlNbaPlayerStatsById = (id) => { return `{player_stats(id:${id}) {id,game_id,player_id,team_id,points,assists,rebounds,nerd}}` }
export const gqlNbaTeamById = (id) => { return `{team(id: ${id}) {id,city,name,full_name,abbrev}}` }
