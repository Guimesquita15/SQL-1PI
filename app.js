const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Abrindo o banco de dados SQLite
let db = new sqlite3.Database(':memory:'); // Utilizando um banco de dados em memória para este exemplo

// Configurando as rotas
app.get('/alunos', (req, res) => {
    db.all('SELECT * FROM Alunos', (err, rows) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(rows);
    });
});

app.get('/alunos/:filtro', (req, res) => {
    const filtro = req.params.filtro;
    let query = '';

    switch (filtro) {
        case 'mais_de_15':
            query = 'SELECT Nome, Idade FROM Alunos WHERE Idade > 15';
            break;
        case 'classe_10':
            query = 'SELECT Nome, Classe, Nota FROM Alunos WHERE Classe = 10';
            break;
        default:
            res.status(400).send('Filtro inválido');
            return;
    }

    db.all(query, (err, rows) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(rows);
    });
});

// Inicializando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
