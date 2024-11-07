const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const connectDB = require('../MongoConnection');
const estagiariosRoutes = require('../routes/estagiarios');
const prontuariosRoutes = require('../routes/prontuarios');
const usersRouter = require('../routes/auth');
const eventRoutes = require('../routes/events');
const uploadRouter = require('../routes/usuarios');
const authRoutes = require('../routes/auth');


const app = express();
const PORT = process.env.PORT || 5000;

// Conectar ao MongoDB
connectDB().catch(error => {
  console.error("Erro ao conectar ao MongoDB:", error);
  process.exit(1); // Encerra o processo em caso de erro
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
app.use('/upload', uploadRouter);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
