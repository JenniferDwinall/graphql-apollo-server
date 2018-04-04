## Description
This is a GraphQL application that supports GQL queries and traditional REST endpoints.

## Getting Started
To install dependencies

    yarn

If you would like to add additional dependencies, simply run

    yarn add --save <package-name>

To run the test suite

    nvm use && yarn test

To build and run the app in dev mode:

    nvm use && yarn dev

To build the production deployment:

    nvm use && yarn build

To run the production deployment:

    nvm use && yarn start

To view the application:

    http://localhost:3000

## REST Endpoints
The main entry point for this application is server.js.  In this file, I have configured a "sport" endpoint with the following line of code:
```
import nbaRouter from './router/nba'
graphQLServer.use('/nba', nbaRouter)
```

If you want to reuse these secondary endpoints for another sport, use this router with another endpoint:
```
import ncaaRouter from './router/nba'
graphQLServer.use('/ncaa', ncaaRouter)
```

When a request is made to one of these traditional REST endpoints, it is translated into a GraphQL query and send to the /graphql endpoint.

## API Endpoints

    http://localhost:3000/graphql

#### Returns all teams
GET /sport/teams
```
query {
  all_games {id,home_team_id,away_team_id,date}
}
```
[Link](http://localhost:3000/graphiql?query=query%20%7B%0A%20%20all_games%20%7Bid%2Chome_team_id%2Caway_team_id%2Cdate%7D%0A%7D)

#### Returns just the team object of the id specified
GET /sport/teams/1
```
query {
  all_players {id,name,team_id}
}
```

[Link](http://localhost:3000/graphiql?query=query%20%7B%0A%20%20all_players%20%7Bid%2Cname%2Cteam_id%7D%0A%7D%0A)

#### Returns all teams
GET /sport/teams
```
query {
  all_teams {id,city,name,full_name,abbrev}
}
```
[Link](http://localhost:3000/graphiql?query=query%20%7B%0A%20%20all_teams%20%7Bid%2Ccity%2Cname%2Cfull_name%2Cabbrev%7D%0A%7D%0A)

#### Returns all games (with scores)
GET /sport/games
```
query($date: Date) {
  games(date: $date) {id,home_team_id,away_team_id,date}
}
```
```
{
  "date":"1/1/2016"
}
```
[Link](http://localhost:3000/graphiql?query=query(%24date%3A%20Date)%20%7B%0A%20%20games(date%3A%20%24date)%20%7Bid%2Chome_team_id%2Caway_team_id%2Cdate%7D%0A%7D%0A&variables=%7B%22date%22%3A%221%2F1%2F2016%22%7D)

#### Returns the game objects of the id specified
GET /sport/games/1
```
query ($id: Int) {
  game(id: $id) {id,home_team_id,away_team_id,date}
}
```
```
{
  "id": 1
}
```
[Link](http://localhost:3000/graphiql?query=query%20(%24id%3A%20Int)%20%7B%0A%20%20game(id%3A%20%24id)%20%7Bid%2Chome_team_id%2Caway_team_id%2Cdate%7D%0A%7D%0A&variables=%7B%0A%20%20%22id%22%3A%20%221%22%0A%7D)

#### Returns the player object of the id specified
GET /sport/player/1
```
query ($id: Int) {
  player(id: $id) {id,name,team_id}
}
```
```
{
  "id": 1
}
```
[Link](http://localhost:3000/graphiql?query=query%20(%24id%3A%20Int)%20%7B%0A%20%20game(id%3A%20%24id)%20%7Bid%2Chome_team_id%2Caway_team_id%2Cdate%7D%0A%7D%0A&variables=%7B%0A%20%20%22id%22%3A%201%0A%7D)

#### Returns all players who played (i.e. had player stats) on a specific date (date format: MMDDYYYY)
GET /sport/players?date=01012016
```
query ($date: Date) {
  players(date: $date) {id,name,team_id}
}
```
```
{
  "date":"1/1/2016"
}
```
[Link](http://localhost:3000/graphiql?query=query%20(%24date%3A%20Date)%20%7B%0A%20%20players(date%3A%20%24date)%20%7Bid%2Cname%2Cteam_id%7D%0A%7D%0A&variables=%7B%0A%20%20%22date%22%3A%221%2F1%2F2016%22%0A%7D)

#### Returns all player stats objects for the specified player
GET /sport/player/1/stats
```
query ($id: Int) {
  player_stats(id: $id) {id,game_id,player_id,team_id,points,assists,rebounds,nerd}
}
```
```
{
  "id":1
}
```
[Link](http://localhost:3000/graphiql?query=query%20(%24id%3A%20Int)%20%7B%0A%20%20player_stats(id%3A%20%24id)%20%7Bid%2Cgame_id%2Cplayer_id%2Cteam_id%2Cpoints%2Cassists%2Crebounds%2Cnerd%7D%0A%7D%0A&variables=%7B%0A%20%20%22id%22%3A1%0A%7D)

#### Returns just the team object of the id specified
GET /sport/teams/1
```
query ($id: Int) {
  team(id: $id) {id,city,name,full_name,abbrev}
}
```
```
{
  "id":1
}
```
[Link](http://localhost:3000/graphiql?query=query%20(%24id%3A%20Int)%20%7B%0A%20%20team(id%3A%20%24id)%20%7Bid%2Ccity%2Cname%2Cfull_name%2Cabbrev%7D%0A%7D%0A&variables=%7B%0A%20%20%22id%22%3A1%0A%7D)
