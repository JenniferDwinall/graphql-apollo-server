var supertest = require('supertest')
var chai = require('chai')
var app = require('../server.js')

/* global describe it expect request */
global.expect = chai.expect
global.request = supertest(app)

describe('Team API Routes', function () {
  describe('GET /nba/teams', function () {
    it('Returns all teams', function (done) {
      request.get('/nba/teams')
        .expect(200)
        .end(function (err, res) {
          const {
            data
          } = res.body

          const {
            all_teams: teams
          } = data

          expect(teams).to.be.a('array')
          expect(teams).to.have.lengthOf(6, 'there are 6 teams')
          done(err)
        })
    })
  })

  describe('GET /nba/teams/:id', function () {
    it('Returns just the team object of the id specified', function (done) {
      request.get('/nba/teams/1')
        .expect(200)
        .end(function (err, res) {
          const {
            data
          } = res.body

          const {
            team
          } = data

          expect(team).to.be.a('object')
          expect(team.id).to.equal(1, 'the id is equal to 1')
          done(err)
        })
    })

    it('Returns nothing if the provided id is invalid', function (done) {
      request.get('/nba/teams/garbage')
        .expect(422)
        .end(function (err, res) {
          const {
            data
          } = res.body

          expect(data).to.equal(undefined, 'the team object is undefined')
          done(err)
        })
    })

    it('Returns nothing if the provided id not found', function (done) {
      request.get('/nba/teams/88')
        // @FIXME: This should be a 404.
        .expect(200)
        .end(function (err, res) {

          const {
            data
          } = res.body

          const {
            team
          } = data

          expect(team).to.equal(null, 'the team object is null')
          done(err)
        })
    })
  })
})
describe('Player API Routes', function () {
  describe('GET /nba/players', function () {
    it('Returns all player', function (done) {
      request.get('/nba/players')
        .expect(200)
        .end(function (err, res) {
          const {
            data
          } = res.body

          const {
            all_players: players
          } = data

          expect(players).to.be.a('array')
          expect(players).to.have.lengthOf(12, 'there are 12 players')
          done(err)
        })
    })
  })

  describe('GET /nba/players?date=:date', function () {
    it('Returns all players who played (i.e. had player stats) on a specific date (date format: MMDDYYYY)', function (done) {
      request.get('/nba/players?date=01012016')
        .expect(200)
        .end(function (err, res) {
          const {
            data
          } = res.body

          const {
            players
          } = data

          expect(players).to.be.a('array')
          expect(players).to.have.lengthOf(12, 'there are 12 players')
          done(err)
        })
    })

    it('Returns 422 response when an invalid date is supplied', function (done) {
      request.get('/nba/players?date=99999999')
        .expect(422)
        .end(function (err, res) {
          const {
            data
          } = res.body

          expect(data).to.equal(undefined, 'the data object is undefined')
          done(err)
        })
    })

    it('Returns 422 response when an invalid date is supplied', function (done) {
      request.get('/nba/players?date=')
        .expect(422)
        .end(function (err, res) {
          const {
            data
          } = res.body

          expect(data).to.equal(undefined, 'the data object is undefined')
          done(err)
        })
    })
  })

  describe('GET /nba/player/:id', function () {
    it('Returns the player object of the id specified', function (done) {
      request.get('/nba/player/1')
        .expect(200)
        .end(function (err, res) {
          const {
            data
          } = res.body

          const {
            player
          } = data

          expect(player).to.be.a('object')
          expect(player.id).to.equal(1, 'the id is equal to 1')
          done(err)
        })
    })
  })

  describe('GET /nba/player/1/stats', function () {
    it('Returns all player stats objects for the specified player', function (done) {
      request.get('/nba/player/1/stats')
        .expect(200)
        .end(function (err, res) {
          const {
            data
          } = res.body

          const {
            player_stats: stats
          } = data

          expect(stats).to.be.a('array')
          expect(stats).to.have.lengthOf(1, 'there is 1 player stats')
          done(err)
        })
    })
  })
})
describe('Game API Routes', function () {
  describe('GET /nba/games', function () {
    it('Returns all games (with scores)', function (done) {
      request.get('/nba/games')
        .expect(200)
        .end(function (err, res) {
          const {
            data
          } = res.body

          const {
            all_games: games
          } = data

          expect(games).to.be.a('array')
          expect(games).to.have.lengthOf(5, 'there are 5 games')
          done(err)
        })
    })
  })

  describe('GET /nba/games?date=', function () {
    it('Returns all games for a given date (date format: MMDDYYYY)', function (done) {
      request.get('/nba/games?date=01012016')
        .expect(200)
        .end(function (err, res) {
          const {
            data
          } = res.body

          const {
            games
          } = data

          expect(games).to.be.a('array')
          expect(games).to.have.lengthOf(3, 'there are 3 games')
          done(err)
        })
    })

    it('Returns 422 response when an invalid date is supplied', function (done) {
      request.get('/nba/games?date=99999999')
        .expect(422)
        .end(function (err, res) {
          const {
            data
          } = res.body

          expect(data).to.equal(undefined, 'the data object is undefined')
          done(err)
        })
    })
  })

  describe('GET /nba/games/1', function () {
    it('Returns the game objects of the id specified', function (done) {
      request.get('/nba/games/1')
        .expect(200)
        .end(function (err, res) {
          const {
            data
          } = res.body

          const {
            game
          } = data

          expect(game).to.be.a('object')
          expect(game.id).to.equal(1, 'the id is equal to 1')
          done(err)
        })
    })
  })
})
