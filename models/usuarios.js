// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  displayName: { type: String, required: true },
  email: { type: String, required: true },
  birthDate: { type: Date },
  phone: { type: String },
  role: { type: String },
  avatarUrl: { type: String, default: '' },
});

module.exports = mongoose.model('registerUsers', userSchema);
