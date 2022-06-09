const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  type: { type: String, required: true, default: 'expense' },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
  description: { type: String, default: '' }
})

module.exports = mongoose.model('Transaction', transactionSchema);