const Book = require('../models/Book');

// CREATE BOOK
exports.createBook = async (req, res) => {
    try {

        const { title, author, price } = req.body;

        if (!title || !author || !price) {
            return res.status(400).json({
                message: 'Title, author and price are required'
            });
        }

        if (price <= 0) {
            return res.status(400).json({
                message: 'Price must be greater than 0'
            });
        }

        const book = await Book.create(req.body);

        res.status(201).json(book);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// GET ALL BOOKS
exports.getBooks = async (req, res) => {
    try {

        const books = await Book.find();

        res.status(200).json(books);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// GET SINGLE BOOK
exports.getBookById = async (req, res) => {
    try {

        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        res.status(200).json(book);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// UPDATE BOOK
exports.updateBook = async (req, res) => {
    try {

        const { price } = req.body;

        if (price !== undefined && price <= 0) {
            return res.status(400).json({
                message: 'Price must be greater than 0'
            });
        }

        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedBook) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        res.status(200).json(updatedBook);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// DELETE BOOK
exports.deleteBook = async (req, res) => {
    try {

        const deletedBook = await Book.findByIdAndDelete(req.params.id);

        if (!deletedBook) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        res.status(200).json({
            message: 'Book deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// GET AVAILABLE BOOKS
exports.getAvailableBooks = async (req, res) => {
    try {

        const books = await Book.find({
            available: true
        });

        res.status(200).json(books);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};