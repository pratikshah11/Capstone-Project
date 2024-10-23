// Load environment variables from .env file
require('dotenv').config();

const { Pool } = require('pg');
const express = require('express');
const app = express();
const port = 5000;

// Database connection configuration using environment variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(express.json()); // Middleware to parse JSON

// GET endpoint - fetches data from the database
app.get('/stocks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM stocks LIMIT 10'); // Example query
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Server error');
  }
});

// POST endpoint - inserts data into the database
app.post('/stocks', async (req, res) => {
  const { date, symbol, adjClose, close, high, low, open, volume } = req.body;

  const query = `
    INSERT INTO stocks (date, symbol, "Adj Close", close, high, low, open, volume)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *`;

  const values = [date, symbol, adjClose, close, high, low, open, volume];

  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Server error');
  }
});

// PUT endpoint - updates an existing record in the database
app.put('/stocks/:id', async (req, res) => {
  const id = req.params.id;
  const { adjClose, close, high, low, open, volume } = req.body;

  const query = `
    UPDATE stocks
    SET "Adj Close" = $1, close = $2, high = $3, low = $4, open = $5, volume = $6
    WHERE id = $7
    RETURNING *`;

  const values = [adjClose, close, high, low, open, volume, id];

  try {
    const result = await pool.query(query, values);
    if (result.rowCount === 0) {
      res.status(404).send('Stock not found');
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Server error');
  }
});

// DELETE endpoint - deletes a record from the database
app.delete('/stocks/:id', async (req, res) => {
  const id = req.params.id;

  const query = 'DELETE FROM stocks WHERE id = $1 RETURNING *';

  try {
    const result = await pool.query(query, [id]);
    if (result.rowCount === 0) {
      res.status(404).send('Stock not found');
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Server error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

