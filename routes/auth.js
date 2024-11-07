// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/login'); // Supondo que você tenha um modelo User no MongoDB
const router = express.Router();

// Rota de cadastro
router.post('/register', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: 'Por favor, preencha todos os campos.' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email já está em uso.' });
    }

    const hashedPassword = await bcrypt.hash(senha, 10); // Hash da senha

    const newUser = new User({ email, senha: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
  }
});

// Rota de login
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: 'Por favor, preencha todos os campos.' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(senha, user.senha))) {
      return res.status(400).json({ message: 'Credenciais inválidas.' });
    }

    // Gerar o token JWT
    const token = jwt.sign({ id: user._id }, 'seuSegredoAqui', { expiresIn: '1h' });

    // Enviar o token no cookie
    res.cookie('authToken', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.status(200).json({ message: 'Login bem-sucedido!' });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro ao fazer login.' });
  }
});

module.exports = router;
