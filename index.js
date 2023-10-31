const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection URL
const url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@book-management.mqnhvx0.mongodb.net/?retryWrites=true&w=majority`;

// Database name
const dbName = 'book-management'; 

// Reusable database connection
let db;

// Function to establish the database connection
const initializeDatabase = async () => {
  const client = new MongoClient(url);

  try {
    await client.connect();
    db = client.db(dbName);
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
};

// Call initializeDatabase to establish the database connection
initializeDatabase()
  .then(() => {
    app.use(bodyParser.json());
    app.set('db', db);

    // Use the books route for book-related APIs
    app.use('/api/books', require('./routes/books'));

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });
