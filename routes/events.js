const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Event = require('../models/Event'); // Certifique-se de que o caminho para o modelo está correto

// Obter todos os eventos
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error('Erro ao obter eventos:', err);
    res.status(500).json({ message: 'Erro ao obter eventos', error: err.message });
  }
});

// Criar novo evento
router.post('/', async (req, res) => {
  const event = new Event({
    title: req.body.title,
    start: req.body.start,
    end: req.body.end,
    specialidade: req.body.specialidade,
    estagiario: req.body.estagiario,
  });

  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    console.error('Erro ao criar evento:', err);
    res.status(400).json({ message: 'Erro ao criar evento', error: err.message });
  }
});

// Atualizar evento
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: 'Evento não encontrado' });

    // Atualiza os campos do evento
    event.title = req.body.title || event.title;
    event.start = req.body.start || event.start;
    event.end = req.body.end || event.end;
    event.specialidade = req.body.specialidade || event.specialidade;
    event.estagiario = req.body.estagiario || event.estagiario;

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (err) {
    console.error('Erro ao atualizar evento:', err);
    res.status(400).json({ message: 'Erro ao atualizar evento', error: err.message });
  }
});

// Deletar evento
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  // Verifica se o ID é válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID inválido' });
  }

  try {
    // Tenta encontrar e excluir o evento pelo ID
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      console.error(`Evento com ID ${id} não encontrado.`);
      return res.status(404).json({ message: 'Evento não encontrado' });
    }

    res.json({ message: 'Evento deletado com sucesso' });
  } catch (err) {
    console.error('Erro ao excluir evento:', err);
    res.status(500).json({ message: 'Erro ao excluir evento', error: err.message });
  }
});

module.exports = router;