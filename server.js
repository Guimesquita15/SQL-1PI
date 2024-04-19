const http = require('http');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end(JSON.stringify(err));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    } else if (req.url === '/alunos') {
        const db = new sqlite3.Database('alunos.db');
        db.all('SELECT * FROM Alunos', (err, rows) => {
            if (err) {
                res.writeHead(500);
                res.end(JSON.stringify(err));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(rows));
        });
        db.close();
    } else if (req.url.startsWith('/aluno/')) {
        const id = req.url.split('/')[2];
        const db = new sqlite3.Database('alunos.db');
        db.get('SELECT * FROM Alunos WHERE ID = ?', [id], (err, row) => {
            if (err) {
                res.writeHead(500);
                res.end(JSON.stringify(err));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(row));
        });
        db.close();
    } else {
        res.writeHead(404);
        res.end('Page not found');
    }
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});