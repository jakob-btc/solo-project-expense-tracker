const Transaction = require('../models/transactionModel');

const transactionController = {};

transactionController.addTransaction = async (req, res, next) => {
  const { amount, category } = req.body;

  try {
    res.locals.createdTransaction = await Transaction.create({ amount, category });
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


module.exports = transactionController;

/* 
  SCHEMA

  type: { type: String, required: true, default: 'expense' },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
  description: { type: String }
*/