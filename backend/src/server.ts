import express from "express";
import {
  getEvents,
  getEventById,
  getPhotosByEvent,
  createEvent,
} from "./db.js";

const app = express();

app.use(express.json());

// GET Requests

// GET Server
app.get("/", (req, res) => {
  res.send("Servidor Express funcionando!");
});

// GET todos os albuns
app.get("/gallery", async (req, res) => {
  try {
    const events = await getEvents();
    res.json(events);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erro ao buscar eventos:", error.message);
    } else {
      console.error(error);
    }
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// GET Fotos dentro dos albuns
app.get("/gallery/:eventId/photos", async (req, res) => {
  try {
    const eventId = Number(req.params.eventId);

    if (Number.isInteger(eventId) && eventId > 0) {
      const event = await getEventById(eventId);

      if (event.length > 0) {
        const photos = await getPhotosByEvent(eventId);
        res.json(photos);
      } else {
        res.status(404).json({ error: "Evento não encontrado" });
        return;
      }
    } else {
      res.status(400).json({ error: "Identificador inválido" });
      return;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erro ao buscar evento:", error.message);
    } else {
      console.error(error);
    }
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// POST Requests


// POST novo album
app.post("/gallery", async (req, res) => {
  try {
    const { title, description, event_date, cover_image_url } = req.body;

    const eventDescription = description || null;
    const eventDate = event_date || null;
    const eventCover = cover_image_url || null;

    if (typeof title !== "string" || title.trim() === "") {
      res.status(400).json({ error: "O título é obrigatório" });
      return;
    }

    const newEvent = await createEvent(
      title.trim(),
      eventDescription,
      eventDate,
      eventCover,
    );

    res.status(201).json(newEvent);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erro ao criar evento", error.message);
    } else {
      console.error(error);
    }
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

app.listen(3000);
