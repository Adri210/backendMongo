// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  specialidade: {
    type: String,
    required: true,
  },
  estagiario: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Event', eventSchema);
