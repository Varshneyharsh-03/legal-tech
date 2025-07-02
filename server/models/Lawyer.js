const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lawyerSchema = new Schema({
  lawyer_Userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: { type: String, required: true },
  specialization: { type: String },
  experience: { type: Number }, // years of experience
  phone: { type: String },
  address: { type: String },
  barCouncilId: { type: String }, // Bar registration number
  languagesSpoken: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Lawyer', lawyerSchema);