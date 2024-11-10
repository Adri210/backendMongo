const express = require('express');
const Prontuario = require('../models/prontuarios');
const router = express.Router();

// Listar todos os prontuários
router.get('/', async (req, res) => {
  try {
    const prontuarios = await Prontuario.find();
    res.json(prontuarios);
  } catch (error) {
    console.error('Erro ao listar prontuários:', error);
    res.status(500).json({ message: 'Erro ao listar prontuários' });
  }
});

// Criar um novo prontuário
router.post('/', async (req, res) => {
  try {
    const { nomePaciente, numero, status, data } = req.body;
    const newProntuario = new Prontuario({ nomePaciente, numero, status, data });
    await newProntuario.save();
    res.status(201).json(newProntuario);
  } catch (error) {
    console.error('Erro ao criar prontuário:', error);
    res.status(500).json({ message: 'Erro ao criar prontuário' });
  }
});

// Atualizar um prontuário existente
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nomePaciente, numero, status, data } = req.body;
    const updatedProntuario = await Prontuario.findByIdAndUpdate(id, { nomePaciente, numero, status, data }, { new: true });
    res.status(200).json(updatedProntuario);
  } catch (error) {
    console.error('Erro ao atualizar prontuário:', error);
    res.status(500).json({ message: 'Erro ao atualizar prontuário' });
  }
});

// Deletar um prontuário
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Prontuario.findByIdAndDelete(id);
    res.status(200).json({ message: 'Prontuário deletado' });
  } catch (error) {
    console.error('Erro ao deletar prontuário:', error);
    res.status(500).json({ message: 'Erro ao deletar prontuário' });
  }
});

module.exports = router;
