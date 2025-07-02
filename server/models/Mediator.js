const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mediatorSchema = new Schema({
  mediator_Userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: { type: String, required: true },
  certificationId: { type: String },
  experience: { type: Number },
  phone: { type: String },
  address: { type: String },
  languagesSpoken: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Mediator', mediatorSchema);