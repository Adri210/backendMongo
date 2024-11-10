const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const connectDB = require('../MongoConnection');

// Importação das rotas
const estagiariosRoutes = require('../routes/estagiarios');
const prontuariosRoutes = require('../routes/prontuarios');
const authRoutes = require('../routes/auth');
const eventRoutes = require('../routes/events');
const employeeRoutes = require('../routes/usuarios'); // Corrigido para `usuariosRoutes`

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar ao MongoDB
connectDB().catch(error => {
  console.error("Erro ao conectar ao MongoDB:", error);
  process.exit(1);
});

// Configurações de cookies e sessão
app.use(cookieParser());
app.use(
  session({
    secret: 'seuSegredoSuperSecreto',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    },
  })
);

// Configurações de CORS
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/estagiarios', estagiariosRoutes);
app.use('/prontuarios', prontuariosRoutes);
app.use('/events', eventRoutes);
app.use(employeeRoutes);
 // Corrigido para `usuariosRoutes`

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
