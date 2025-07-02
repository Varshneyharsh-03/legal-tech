const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  client_Userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: { type: String, required: true },
  age: { type: Number },
  gender: { type: String },
  phone: { type: String },
  address: { type: String },
  legalNeeds: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);