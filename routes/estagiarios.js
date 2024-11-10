const express = require('express');
const Estagiario = require('../models/estagiarios');

const router = express.Router();

// Rota para listar todos os estagiários
router.get('/', async (req, res) => {
  try {
    const estagiarios = await Estagiario.find();
    res.json(estagiarios);
  } catch (error) {
    console.error('Erro ao listar estagiários:', error);
    res.status(500).json({ message: 'Erro ao listar estagiários' });
  }
});

// Rota para adicionar um novo estagiário
router.post('/', async (req, res) => {
  try {
    const { nome, area, turno, horario } = req.body;
    const newEstagiario = new Estagiario({ nome, area, turno, horario });
    await newEstagiario.save();
    res.status(201).json(newEstagiario);
  } catch (error) {
    console.error('Erro ao criar estagiário:', error);
    res.status(500).json({ message: 'Erro ao criar estagiário' });
  }
});

// Rota para editar um estagiário existente
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, area, turno, horario } = req.body;
    const updatedEstagiario = await Estagiario.findByIdAndUpdate(
      id, 
      { nome, area, turno, horario },
      { new: true } // Retorna o documento atualizado
    );
    if (!updatedEstagiario) {
      return res.status(404).json({ message: 'Estagiário não encontrado' });
    }
    res.json(updatedEstagiario);
  } catch (error) {
    console.error('Erro ao atualizar estagiário:', error);
    res.status(500).json({ message: 'Erro ao atualizar estagiário' });
  }
});

// Rota para excluir um estagiário
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Estagiario.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (error) {
    console.error('Erro ao deletar estagiário:', error);
    res.status(500).json({ message: 'Erro ao deletar estagiário' });
  }
});

module.exports = router
