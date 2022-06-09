const Transaction = require('../models/transactionModel');

const transactionController = {};

transactionController.addTransaction = async (req, res, next) => {
  const { amount, category, date, description } = req.body;
  let type = 'expense'
  if (category === 'income') {
    type = 'income';
  }

  try {
    if (date) res.locals.createdTransaction = await Transaction.create({ amount, category, date, description, type });
    else res.locals.createdTransaction = await Transaction.create({ amount, category, description, type });
  }
  
  catch (err) {
    return next({
      log: `transactionController.addTransaction: ERROR occurred adding a transaction. ${err}`,
      message: {
        err: 'An error occured adding a transaction'
      }
    })
  }

  return next()
}

transactionController.getAllExpenses = async (req, res, next) => {
 
  try {
    res.locals.allExpenses = await Transaction.find({type: 'expense'}).exec();
  }

  catch (err) {
    return next({
      log: `transactionController.getAllExpenses: ERROR occurred reading database. ${err}`,
      message: {
        err: 'An error occured getting all the expenses'
      }
    })
  }
  return next();
}

transactionController.getAllIncome = async (req, res, next) => {
 
  try {
    res.locals.allIncome = await Transaction.find({type: 'income'}).exec();
  }

  catch (err) {
    return next({
      log: `transactionController.getAllIncome: ERROR occurred reading database. ${err}`,
      message: {
        err: 'An error occured getting all income'
      }
    })
  }
  return next();
}

transactionController.getAllEntries = async (req, res, next) => {
 
  try {
    res.locals.allEntries = await Transaction.find({}).exec();
  }

  catch (err) {
    return next({
      log: `transactionController.getAllEntries: ERROR occurred reading database. ${err}`,
      message: {
        err: 'An error occured getting all entries'
      }
    })
  }
  return next();
}

transactionController.getOneEntry = async (req, res, next) => {
  const { id } = req.query;
  // console.log(id);

  try {
    res.locals.oneEntry = await Transaction.find({}).exec();
  }

  catch (err) {
    return next({
      log: `transactionController.getOneEntry: ERROR occurred reading database. ${err}`,
      message: {
        err: 'An error occured getting one entry'
      }
    })
  }
  return next();
}


transactionController.deleteEntry = async (req, res, next) => {
  const { id } = req.query;
  console.log('id - line 84 - transactionController.js', id);
  
  try {
    res.locals.deletedEntry = await Transaction.remove({_id: id}).exec();
  }

  catch (err) {
    return next({
      log: `transactionController.deleteEntry: ERROR occurred deleting an entry from the database. ${err}`,
      message: {
        err: 'An error occured deleting the an entry from the database'
      }
    })
  }
  return next();
}



// CAREFUL WITH THIS ONE - DELETES THE WHOLE DATABASE

transactionController.deleteAll = async (req, res, next) => {
  try {
    await Transaction.remove({}).exec();
    res.locals.newState = await Transaction.find({}).exec();
  }

  catch (err) {
    return next({
      log: `transactionController.deleteAll: ERROR occurred deleting the whole database. ${err}`,
      message: {
        err: 'An error occured deleting the whole database'
      }
    })
  }
  return next();
}

module.exports = transactionController;

/* 
  SCHEMA

  type: { type: String, required: true, default: 'expense' },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
  description: { type: String }
*/