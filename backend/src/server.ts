import express from "express";
import { eventSchema } from "./eventSchema.js";
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
    const result = eventSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        error: "Dados inválidos",
        details: result.error.issues,
      });
      return;
    }

    const { title, event_date, description, cover_image_url } = result.data;

    let eventDate: string | null = null;
    let eventDescription: string | null = null;
    let eventCover: string | null = null;

    if (event_date) {
      const dateData = event_date.split("/");
      eventDate = `${dateData[2]}-${dateData[1]}-${dateData[0]}`;
    }

    if (description) {
      eventDescription = description;
    }
    if (cover_image_url) {
      eventCover = cover_image_url;
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
