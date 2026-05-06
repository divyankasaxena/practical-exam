const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: [1, 'Price must be greater than 0']
    },
    available: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Book', bookSchema);