// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3001; // or any port of your choice

// Create a MySQL connection
const db = mysql.createConnection({
    host: 'localhost:3306',
    user: 'root',
    password: '1234',
    database: 'wiki',
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

// Middleware for parsing JSON requests
app.use(bodyParser.json());

// Define your routes

// Sample route for fetching search results
app.get('/api/search/:query', (req, res) => {
    const query = req.params.query;

    // Implement your database query logic here
    // Use query parameter 'query' to perform the search
    // Modify this query according to your database schema
    const sql = `
    SELECT title, titles_count, distinct_words_page, distinct_words_titles
    FROM search_results
    WHERE title LIKE '%${query}%'
  `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json(results);
        }
    });
});

// Add more routes as needed for your application

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
