const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  surname: { type: String },
  birthDate: { type: Date },
  phone: { type: String },
  role: { type: String },
}, {
  collection: 'employees' // Nome da coleção personalizado
});

const Employee = mongoose.models.Employee || mongoose.model('Employee', employeeSchema);

module.exports = Employee;
