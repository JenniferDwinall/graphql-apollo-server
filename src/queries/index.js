/*
 * Each rest endpoint is mapped to a graphql query. Below are the queries
 * related to basketball data.
 */

export const gqlBasketballAllGames = () => { return `{all_games {id,home_team_id,away_team_id,date}}` }
export const gqlBasketballAllGamesWithScores = () => { return `{all_games {id,home_team_id,away_team_id,date}}` }
export const gqlBasketballAllPlayers = () => { return `{all_players {id,name,team_id}}` }
export const gqlBasketballAllTeams = () => { return `{all_teams{id,city,name,full_name,abbrev}}` }
export const gqlBasketballGamesByDate = (date) => { return `{games(date:"${date}"){id,home_team_id,away_team_id,date}}` }
export const gqlBasketballGamesById = (id) => { return `{game(id:${id}){id,home_team_id,away_team_id,date}}` }
export const gqlBasketballPlayerById = (id) => { return `{player(id:${id}) {id,name,team_id}}` }
export const gqlBasketballPlayersByDate = (date) => { return `{players(date:"${date}") {id,name,team_id}}` }
export const gqlBasketballPlayerStatsById = (id) => { return `{player_stats(id:${id}) {id,game_id,player_id,team_id,points,assists,rebounds,nerd}}` }
export const gqlBasketballTeamById = (id) => { return `{team(id: ${id}) {id,city,name,full_name,abbrev}}` }
