const express = require('express');
const { ObjectId } = require('mongodb');
const upload = require('../src/multerconfig'); // Importando a configuração do Multer
const { connectToDatabase } = require('../MongoConnection'); // Função de conexão com o MongoDB
const router = express.Router();

// Rota para obter todos os usuários
router.get('/users', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection('registerUsers');
    const users = await usersCollection.find({}).toArray();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
});

// Rota para criar/editar um usuário
router.post('/users', async (req, res) => {
  try {
    const { name, email, role, birthDate, phone, avatarUrl, userId } = req.body;

    const profileData = {
      displayName: name,
      email,
      role,
      birthDate,
      phone,
      avatarUrl
    };

    const db = await connectToDatabase();
    const usersCollection = db.collection('registerUsers');

    if (userId) {
      // Editar usuário
      await usersCollection.updateOne({ _id: new ObjectId(userId) }, { $set: profileData });
      res.status(200).json({ message: 'Usuário atualizado.' });
    } else {
      // Criar usuário
      await usersCollection.insertOne(profileData);
      res.status(201).json({ message: 'Usuário criado.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao salvar usuário.' });
  }
});

// Rota para excluir um usuário
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectToDatabase();
    const usersCollection = db.collection('registerUsers');
    await usersCollection.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ message: 'Usuário excluído.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir usuário.' });
  }
});

// Rota para upload de imagem
router.post('/upload-avatar', upload.single('avatar'), (req, res) => {
  if (req.file) {
    res.status(200).json({ avatarUrl: `/uploads/${req.file.filename}` });
  } else {
    res.status(400).json({ error: 'Falha ao fazer upload da imagem.' });
  }
});

module.exports = router;
