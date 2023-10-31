const express = require('express');
const {ObjectId} = require('mongodb');
const router = express.Router();

// Reuse the shared database connection from index.js
let db;

// Middleware to set up the database connection
router.use((req, res, next) => {
  db = req.app.get('db');
  next();
});

// Create a new book
router.post('/', async (req, res) => {
  try {
    const { title, author, summary } = req.body;
    const book = { title, author, summary };
    const result = await db.collection('books').insertOne(book);
    book._id = result.insertedId
    res.json(book);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'Could not create the book.' });
  }
});

// Get list of all books
router.get('/', async (req, res) => {
  const books = await db.collection('books').find({}).toArray();
  res.json(books);
});

// Get details of a specific book by its ID
router.get('/:id', async (req, res) => {
  try {
    const book = await db.collection('books').findOne({ _id: new ObjectId(req.params.id) });
    if (!book) {
      res.status(404).json({ error: 'Book not found.' });
    } else {
      res.json(book);
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'Could not fetch the book.' });
  }
});

// Update a book's details by its ID
router.put('/:id', async (req, res) => {
    const bookId = new ObjectId(req.params.id);
    const updatedBookData = req.body;
  
    try {
      // Check if the book with the specified ID exists
      const existingBook = await db.collection('books').findOne({ _id: bookId });
  
      if (existingBook) {
        // Book exists, proceed with the update
        const updateResult = await db.collection('books').findOneAndUpdate(
          { _id: bookId },
          { $set: updatedBookData },
          { returnDocument: 'after' }
        );
  
        if (updateResult) {
          res.json(updateResult);
        } else {
          res.status(400).json({ error: 'Could not update the book.' });
        }
      } else {
        // Book does not exist
        res.status(404).json({ error: 'Book not found.' });
      }
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: 'Could not update the book.' });
    }
  });
  

// Delete a book by its ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await db.collection('books').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 1) {
      res.json({ message: 'Book deleted successfully.' });
    } else {
      res.status(404).json({ error: 'Book not found.' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Could not delete the book.' });
  }
});

module.exports = router;
