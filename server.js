const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/bookDB')
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err));

app.use('/books', bookRoutes);

app.get('/', (req, res) => {
    res.send('Book Management API Running');
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});