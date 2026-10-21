import { createServer } from "node:http";

const evento = {
  titulo: "A peça de estreia",
  ano: 2026,
};

/*const server = createServer((req, res) => {
  if (req.url === "/") {
    res.end("Página Inicial");
  } else if (req.url === "/gallery") {
    res.setHeader('Content-Type', 'application/json')
    res.end(eventojson);
  } else {
    res.statusCode = 404;
    res.end("Página não encontrada");
  }
});

server.listen(3000);*/

import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Servidor Express funcionando!");
});

app.get('/gallery', (req, res) => {
    res.json(evento)
})

app.post('/gallery', (req, res) => {
    res.send('Recebi uma requisição POST!')
})

app.listen(3000)