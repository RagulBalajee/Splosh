const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const withdrawalSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  withdrawAmount: {
    type: Number,
    required: true
  },
  amount: {
    type: Number
  },
  deduct_amount: {
    type: Number
  },
  price: {
    type: Number
  },
  isapprove : {
    type: Boolean,
    default : false
  },
  isreject : {
    type: Boolean,
    default : false
  },
  trxnHash : {
    type: String,
    default : null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  timestamp:{
    type: Date,
    default: Date.now
  }
});

const WithdrawalModel = mongoose.model('Withdrawal', withdrawalSchema);

module.exports = WithdrawalModel;