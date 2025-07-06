const express = require('express');
const navegacao = require('./public/src/navegacao.js');
const path = require('path');

const app = express();
const port = 3001;

// Servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

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

