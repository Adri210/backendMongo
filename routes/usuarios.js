const express = require('express');
const router = express.Router();
const Employee = require('../models/usuarios'); // Importa o modelo de Employee

// Rota para listar os funcionários
router.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para criar um novo funcionário
router.post('/api/employees', async (req, res) => {
  const { name, surname, email, birthDate, phone, role } = req.body;
  try {
    const newEmployee = new Employee({
      name,
      surname,
      email,
      birthDate,
      phone,
      role
    });
    await newEmployee.save();
    res.status(201).json(newEmployee); // Retorna o novo funcionário criado
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para atualizar um funcionário
router.put('/api/employees/:id', async (req, res) => {
  const { name, surname, email, birthDate, phone, role } = req.body;
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, surname, email, birthDate, phone, role },
      { new: true }
    );
    res.json(employee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para excluir um funcionário
router.delete('/api/employees/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Funcionário excluído com sucesso!' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
