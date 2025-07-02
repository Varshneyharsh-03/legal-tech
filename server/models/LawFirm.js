const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lawFirmSchema = new Schema({
  lawfirm_Userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  firmName: { type: String, required: true },
  registrationNumber: { type: String },
  address: { type: String },
  phone: { type: String },
  email: { type: String },
  servicesOffered: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('LawFirm', lawFirmSchema);