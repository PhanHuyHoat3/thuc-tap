    // src/routes/Book.routes.js
    const { ApolloServer } = require('@apollo/server');
    const { expressMiddleware } = require('@apollo/server/express4');
    const { typeDefs } = require('../schema');
    const { resolvers } = require('../rosolvers');
    const express = require('express');

    const router = express.Router();

    const server = new ApolloServer({
    typeDefs,
    resolvers,
    });

    async function startServer() {
    await server.start();
    router.use(express.json(), expressMiddleware(server));
    }

    startServer().catch((error) => console.error('Apollo Server failed to start:', error));

    module.exports = router;