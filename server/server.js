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
app.use(express.urlencoded());

app.use('/client', express.static(path.resolve(__dirname, '../client')));


// GET requests

// SERVING UP HTML FILES

// GET landing page 
app.get(
  '/',
  (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/index.html'));
  }
);

// GET add expense
app.get(
  '/add/expense',
  (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/addTransaction.html'));
  }
);

// GET added expense
app.get(
  '/added',
  (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/added.html'));
  }
);

app.get(
  '/report',
  (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/report.html'));
  }
);

app.get(
  '/adjustments',
  (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/report-new.html'));
  }
);


// QUERYING THE DATABASE

// GET all expenses
app.get(
  '/report/expenses',
  transactionController.getAllExpenses,
  (req, res) => {
    res.status(200).send({expenses: res.locals.allExpenses});
  }
);

// GET all income
app.get(
  '/report/income',
  transactionController.getAllIncome,
  (req, res) => {
    res.status(200).send({income: res.locals.allIncome});
  }
);

// POST requests

// POST request for writing expense to database
app.post(
  '/add/expense',
  transactionController.addTransaction,
  (req, res) => {
    // res.status(200).json(res.locals.createdTransaction);  
    res.redirect('/added');
  }
);

// DELETE requests

app.delete(
  '/delete/all',
  transactionController.deleteAll,
  (req, res) => {
    res.status(200).send(res.locals.newState)
  }
)


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
