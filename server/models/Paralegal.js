const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paralegalSchema = new Schema({
  paralegal_Userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: { type: String, required: true },
  qualifications: { type: String },
  experience: { type: Number },
  phone: { type: String },
  address: { type: String },
  skills: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Paralegal', paralegalSchema);