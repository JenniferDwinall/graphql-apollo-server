import bodyParser from 'body-parser'
import express from 'express'
import {
  graphqlExpress,
  graphiqlExpress
} from 'apollo-server-express'
import {
  makeExecutableSchema
//  addMockFunctionsToSchema
} from 'graphql-tools'

// import mocks from './data/mocks'
// addMockFunctionsToSchema({ schema, mocks })

import typeDefs from './src/data/typeDefs'
import resolvers from './src/data/resolvers'

import basketballRouter from './src/router/basketball'

const GRAPHQL_PORT = 3000
const graphQLServer = express()
export const schema = makeExecutableSchema({ typeDefs, resolvers })

// Static assets (the json files supplied for the example).
graphQLServer.use('/static', express.static('static'))

// GraphQL endpoints.
graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

// REST Endpoints.
graphQLServer.use('/nba', basketballRouter)

module.exports = graphQLServer.listen(GRAPHQL_PORT, () =>
  console.log(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
  )
)
