const express = require('express');
const cors = require('cors');

const authRoutes = require('../routes/auth.routes');
const userRoutes = require('../routes/user.routes');
const petRoutes = require('../routes/pet.routes');
const adoptionRoutes = require('../routes/adoption.routes');

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rotas públicas
app.use('/login', authRoutes);
app.use('/users', userRoutes);
app.use('/pets', petRoutes);
app.use('/adoptions', adoptionRoutes);

// Middleware para rotas não encontradas (404)
app.use((req, res, next) => {
  res.status(404).json({ error: 'Endpoint não encontrado.' });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno no servidor.' });
});

module.exports = app;