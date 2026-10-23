import express from "express";
import {
  getEvents,
  getEventById,
  getPhotosByEvent,
  createEvent,
} from "./db.js";

const app = express();

app.use(express.json);

app.get("/", (req, res) => {
  res.send("Servidor Express funcionando!");
});

app.get("/gallery", async (req, res) => {
  try {
    const events = await getEvents();
    res.json(events);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erro ao buscar eventos:", error.message);
    } else{
        console.error(error)
    }
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});
