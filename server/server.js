const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const transactionController = require('./controllers/transactionController')

const PORT = 3000;

const app = express();

const mongoURI = process.env.NODE_ENV === 'development' ?
  'mongodb://localhost/solo-project-expense-tracker' : 'mongodb://localhost/solo-project-expense-tracker-dev';
mongoose.connect(mongoURI);

app.use(express.json());
// app.use(express.urlencoded());

// GET requests

// GET landing page 
app.get(
  '/',
  (req, res) => {
    res.sendFile(path.resolve(__dirname, 'TO DO: add path to landing page'));
  }
);

// GET add expense
app.get(
  '/add/expense',
  (req, res) => {
    res.sendFile(path.resolve(__dirname, 'TO DO: add path to add expense page'));
  }
);

// GET added expense
app.get(
  '/added',
  (req, res) => {
    res.sendFile(path.resolve(__dirname, 'TO DO: add path to added page'));
  }
);

// POST requests

// POST request for writing expense to database
app.post(
  '/add/expense',
  transactionController.addTransaction,
  (req, res) => {
    res.redirect('/added')
  }
);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => { console.log(`Listening on port ${PORT}...`); });

module.exports = app;
