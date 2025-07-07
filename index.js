const express = require('express');
const navegacao = require('./public/src/navegacao.js');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 3001;

// Servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint para servir configurações do ambiente
app.get('/api/config', (req, res) => {
    res.json({
        ENDERECO_API: process.env.ENDERECO_API || 'http://localhost:8080/'
    });
});

// Rota para a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'index.html'));
});
app.get('/consultar', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'consultar.html'))
});
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

