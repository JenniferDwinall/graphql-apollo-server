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


Teams Endpints

GET /sport/teams

	Returns all teams

GET /sport/teams/1

	Returns just the team object of the id specified

Players Endpints

GET /sport/players

	Returns all player

GET /sport/players?date=01012016

	Returns all players who played (i.e. had player stats) on a specific date (date format: MMDDYYYY)

GET /sport/player/1

	Returns the player object of the id specified

GET /sport/player/1/stats

	Returns all player stats objects for the specified player

Games Endpints

GET /sport/games

	Returns all games (with scores)

GET /sport/games?date=01012016

	Returns all games for a given date (date format: MMDDYYYY)

GET /sport/games/1

	Returns the game objects of the id specified
