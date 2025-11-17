/**
 * This is the frontend for my Budget Tracker App
 * It is really simple as AI assisted me in creating it.
 * As of now it only lets expenses be added, and shows the list of expenses from the backend
 * I will be able to build off of this once start doing pipeline work.
 */

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    loadExpenses();
  }, []);

// This line is where the system will allow expenses entered into the app to load
  async function loadExpenses() {
    const res = await axios.get('http://localhost:4000/expenses');
    setExpenses(res.data);
  }

// This line will allow the expense the user chooses to add them into the app
  async function addExpense(e) {
    e.preventDefault();
    await axios.post('http://localhost:4000/expenses', {
      description,
      amount: parseFloat(amount)
    });
    setDescription('');
    setAmount('');
    loadExpenses();
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Budget Tracker</h1>

      <form onSubmit={addExpense}>
        <input 
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input 
          placeholder="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button>Add</button>
      </form>

      <ul>
        {expenses.map(e => (
          <li key={e.id}>{e.description} — ${e.amount}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

