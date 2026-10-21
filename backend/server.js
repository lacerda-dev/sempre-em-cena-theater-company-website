import express from "express";
import { getEvents } from "./db.js";

const evento = {
  titulo: "A peça de estreia",
  ano: 2026,
};

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor Express funcionando!");
});

app.get("/gallery", (req, res) => {
  res.json(evento);
});

app.get("/events", async (req, res) => {
  try {
    const events = await getEvents();
    res.json(events);
  } catch (error) {
    console.error("Erro ao buscar eventos:", error.message);
    res.status(500).json({ error: "Error interno do servidor" });
  }
});

app.post("/gallery", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

app.listen(3000);
