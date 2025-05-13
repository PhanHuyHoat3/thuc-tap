    // src/resolvers.js
    const bookService = require('./services/bookService');

    const resolvers = {
    Query: {
        books: async () => await bookService.getAllBooks(),
        book: async (_, { id }) => await bookService.getBookById(id),
    },
    Mutation: {
        createBook: async (_, { input }) => await bookService.createBook(input),
        updateBook: async (_, { id, input }) => await bookService.updateBook(id, input),
        deleteBook: async (_, { id }) => await bookService.deleteBook(id),
    },
    };

    module.exports = { resolvers };