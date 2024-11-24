const mongoose = require('mongoose');

const FillQuotationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  movingFrom: {
    type:String,
  },
  movingTo: {
    type:String,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const FillQuotation = mongoose.model('FillQuotation', FillQuotationSchema);

module.exports = FillQuotation;
