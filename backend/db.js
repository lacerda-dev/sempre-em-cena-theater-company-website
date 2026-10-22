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

export async function getEvents() {
  const result = await pool.query(
    "SELECT * FROM events ORDER BY event_date DESC",
  );

  return result.rows;
}

export async function getPhotosByEvent(eventId) {
  const result = await pool.query(
    "SELECT * FROM photos WHERE event_id = $1 ORDER BY id ASC",
    [eventId],
  );
  return result.rows;
}
