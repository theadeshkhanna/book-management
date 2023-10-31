# Book Management API

This is a simple RESTful API for managing a collection of books. It allows you to perform basic CRUD (Create, Read, Update, Delete) operations on books stored in a MongoDB database.

## API Endpoints and Their Usage

### 1. Create a New Book

- **Endpoint**: `POST /api/books`
- **Usage**: Create a new book by sending a JSON object with the book's information (title, author, summary) in the request body.

**Example Request:**
```json
POST /api/books
{
  "title": "Sample Book",
  "author": "John Doe",
  "summary": "A sample book summary."
}
```

### 2. Get a List of All Books

- **Endpoint**: `GET /api/books`
- **Usage**: Retrieve a list of all books in the database.

**Example Request:**
```json
GET /api/books
```

### 3. Get Details of a Specific Book

- **Endpoint**: `GET /api/books/:id`
- **Usage**: Retrieve the details of a specific book by specifying its ID in the URL parameter.

**Example Request:**
```json
GET /api/books/123456789012345678901234
```

### 4. Update a Book's Details

- **Endpoint**: `PUT /api/books/:id`
- **Usage**: Update the details of a specific book by specifying its ID in the URL parameter and sending a JSON object with the updated book information in the request body.

**Example Request:**
```json
PUT /api/books/123456789012345678901234
{
  "title": "Updated Book Title",
  "author": "Jane Smith",
  "summary": "An updated book summary."
}
```

### 5. Delete a Book

- **Endpoint**: `DELETE /api/books/:id`
- **Usage**: Delete a specific book by specifying its ID in the URL parameter.

**Example Request:**
```json
DELETE /api/books/123456789012345678901234
```

## Instructions to Set Up and Run the Application Locally

To set up and run this application on your local machine, follow these steps:

### 1. Clone the repository from GitHub:
```json
git clone <repository_url>
```
### 2. Navigate to the project directory:
```json
cd book-management-api
```
### 3. Create a .env file in the project root and set the following environment variables:
```json
PORT=3000
MONGO_USERNAME=<YourMongoDBUsername>
MONGO_PASSWORD=<YourMongoDBPassword>
```
Replace YourMongoDBUsername and YourMongoDBPassword with your MongoDB credentials.

### 4. Install project dependencies:
```json
npm install
```
### 5. Start the application:
```json
npm start
```


