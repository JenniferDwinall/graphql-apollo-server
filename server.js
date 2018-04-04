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
import typeDefs from './data/typeDefs'
import resolvers from './data/resolvers'

import nbaRouter from './router/nba'

// addMockFunctionsToSchema({ schema, mocks })

const GRAPHQL_PORT = 3000
const graphQLServer = express()
export const schema = makeExecutableSchema({ typeDefs, resolvers })

// GraphQL endpoints.
graphQLServer.use('/static', express.static('static'))
graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

// REST Endpoints
graphQLServer.use('/nba', nbaRouter)

graphQLServer.listen(GRAPHQL_PORT, () =>
  console.log(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
  )
)
