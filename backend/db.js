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

// Functions GET

export async function getEvents() {
  const result = await pool.query(
    "SELECT * FROM events ORDER BY id DESC",
  );

  return result.rows;
}

export async function getEventById(eventId) {
  const result = await pool.query("SELECT * FROM events WHERE id = $1", [
    eventId,
  ]);
  return result.rows;
}

export async function getPhotosByEvent(eventId) {
  const result = await pool.query(
    "SELECT * FROM photos WHERE event_id = $1 ORDER BY id ASC",
    [eventId],
  );
  return result.rows;
}

// Functions POST

export async function createEvent(title, description, date, cover) {
  const result = await pool.query(
    "INSERT INTO events (title, description, event_date, cover_image_url) VALUES ($1, $2, $3, $4) RETURNING *",
    [title, description, date, cover],
  );
  return result.rows[0];
}
