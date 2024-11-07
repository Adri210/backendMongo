// models/Estagiario.js
const mongoose = require('mongoose');


const EstagiarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  area: { type: String, required: true },
  turno: { type: String, required: true },
  horario: { type: String, required: true },
});

module.exports =  mongoose.model('Estagiario', EstagiarioSchema);
