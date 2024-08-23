const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  workEmail: {
    type: String,
  },
  teams: { type: String },
  dob: { type: Date },
  gender: { type: String },
  nationality: { type: String },
  contactNo: { type: String },
  profilePhoto: { type: String }, // URL of the profile photo
}, { timestamps: true });

module.exports = mongoose.model('Member', memberSchema);
