const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3000;

// Replace these credentials with your MySQL connection details
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    port: 3307,
    connectionLimit: 5,
});
app.use(cors());
app.use(bodyParser.json());

// Database connection module
const connectDB = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error connecting to the database:', err);
                reject(err);
                return;
            }
            resolve(connection);
        });
    });
};

// Function to execute a query with a Promise
const executeQuery = (connection, query, values) => {
    return new Promise((resolve, reject) => {
        connection.query(query, values, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

app.get('/search/titles/:keyword', async (req, res) => {
    try {
        const keyword = req.params.keyword;

        if (!keyword) {
            return res.status(400).json({ error: 'Bad Request', message: 'Please provide a valid search keyword' });
        }

        const query = 'SELECT * FROM wikipediacrawler.documentos WHERE title LIKE ?';
        const connection = await connectDB();

        try {
            const rows = await executeQuery(connection, query, [`%${keyword}%`]);

            // Log the executed SQL query
            console.log('Executed SQL Query:', connection.format(query, [`%${keyword}%`]));

            // Check if rows is defined and has a length property
            if (rows === undefined) {
                console.error('Query returned undefined rows');
            }

            if (rows && rows.length === 0) {
                console.log('No documents found with the given title keyword');
                return res.status(404).json({ message: 'No documents found with the given title keyword' });
            }

            res.json(rows);
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Error in /search/titles:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/search/subtitles/:keyword', async (req, res) => {
    try {
        const keyword = req.params.keyword;

        if (!keyword) {
            return res.status(400).json({ error: 'Bad Request', message: 'Please provide a valid search keyword' });
        }

        const query = 'SELECT * FROM wikipediacrawler.documentos WHERE subtitles LIKE ?';
        const connection = await connectDB();

        try {
            const rows = await executeQuery(connection, query, [`%${keyword}%`]);

            console.log('Executed SQL Query:', connection.format(query, [`%${keyword}%`]));

            if (rows === undefined) {
                console.error('Query returned undefined rows');
            }

            if (rows && rows.length === 0) {
                console.log('No documents found with the given subtitles keyword');
                return res.status(404).json({ message: 'No documents found with the given subtitles keyword' });
            }

            res.json(rows);
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Error in /search/subtitles:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
