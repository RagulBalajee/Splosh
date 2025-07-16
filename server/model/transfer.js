const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transferSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  touserId: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  touser: {
    type: String,
    required: true
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

const transferModel = mongoose.model('transfer', transferSchema);

module.exports = transferModel;