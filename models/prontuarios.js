// models/Prontuario.js
const mongoose = require('mongoose');

const ProntuarioSchema = new mongoose.Schema({
  nomePaciente: { type: String, required: true },
  numero: { type: String, required: true },
  status: { type: String, required: true },
  data: { type: Date, required: true },
});

module.exports = mongoose.model('Prontuario', ProntuarioSchema);
