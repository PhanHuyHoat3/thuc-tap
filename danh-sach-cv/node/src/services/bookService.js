    // src/services/bookService.js
    const Book = require('../models/Book.model');

    class BookService {
    async getAllBooks() {
        return await Book.find();
    }

    async getBookById(id) {
        return await Book.findById(id);
    }

    async createBook(data) {
        const book = new Book(data);
        return await book.save();
    }

    async updateBook(id, data) {
        return await Book.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteBook(id) {
        return await Book.findByIdAndDelete(id);
    }
    }

    module.exports = new BookService();