const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const corporateSchema = new Schema({
  corporate_Userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  companyName: { type: String, required: true },
  industry: { type: String },
  registrationNumber: { type: String },
  address: { type: String },
  contactPerson: { type: String },
  phone: { type: String },
  email: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Corporate', corporateSchema);