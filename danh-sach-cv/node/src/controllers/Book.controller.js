    // src/controllers/bookController.js
    const bookService = require('../services/bookService');

    class BookController {
    async getBooks(_, res) {
        const books = await bookService.getAllBooks();
        res.json(books);
    }

    async getBook(_, res, { id }) {
        const book = await bookService.getBookById(id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    }

    async createBook(_, res, { input }) {
        const book = await bookService.createBook(input);
        res.status(201).json(book);
    }

    async updateBook(_, res, { id, input }) {
        const book = await bookService.updateBook(id, input);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    }

    async deleteBook(_, res, { id }) {
        const book = await bookService.deleteBook(id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.status(204).send();
    }
    }

    module.exports = new BookController();