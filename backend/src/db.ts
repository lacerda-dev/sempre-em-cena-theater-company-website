import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});
export default pool;

// Interfaces

interface Event {
  id: number;
  title: string;
  description: string | null;
  event_date: Date | null;
  cover_image_url: string | null;
}

interface Photo {
  id: number;
  image_url: string;
  event_id: number;
}

// GET functions

export async function getEvents() {
  const result = await pool.query<Event>("SELECT * FROM events ORDER BY id DESC");
  return result.rows;
}

export async function getEventById(eventId: number) {
  const result = await pool.query<Event>("SELECT * FROM events WHERE id = $1", [
    eventId,
  ]);
  return result.rows;
}

export async function getPhotosByEvent(eventId: number) {
  const result = await pool.query<Photo>(
    "SELECT * FROM photos WHERE event_id = $1 ORDER BY id ASC",
    [eventId],
  );
  return result.rows;
}

// POST functions

export async function createEvent(
  title: string,
  description: string | null,
  date: Date | null,
  cover: string | null,
) {
  const result = await pool.query<Event>(
    "INSERT INTO events (title, description, event_date, cover_image_url) VALUES ($1, $2, $3, $4) RETURNING *",
    [title, description, date, cover],
  );
  return result.rows[0];
}
