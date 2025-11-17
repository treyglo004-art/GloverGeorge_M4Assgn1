/**
 * This is the backend for my budget tracker app
 * While looking for skeleton code to use AI suggested that I use Express and SQLite to store expenses.
 * The file will set up the server needed creating a database file
 * Will also handle the adding and listing of expenses. 
 */

const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Create or open SQLite database
const db = new sqlite3.Database(path.join(__dirname, 'expenses.db'));

// Create the expenses table, will give the user the ability to enter in their expenses
//they want calculated into a table.
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    amount REAL NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

// This line will list the expenses the user has
app.get('/expenses', (req, res) => {
  db.all('SELECT * FROM expenses ORDER BY created_at DESC', (err, rows) => {
    res.json(rows);
  });
});

// This line will let the user add an expense to the table to be calculated within the total
app.post('/expenses', (req, res) => {
  const { description, amount } = req.body;
  const stmt = db.prepare('INSERT INTO expenses(description, amount) VALUES (?, ?)');
  stmt.run(description, amount, function () {
    res.json({ id: this.lastID });
  });
});

// Start the backend server
app.listen(4000, () => {
  console.log(`Backend running on port 4000`);
});

