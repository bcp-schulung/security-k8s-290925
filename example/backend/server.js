const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 3000;

// Database config from environment variables
const pool = new Pool({
  host: process.env.DB_HOST || "postgres",
  user: process.env.DB_USER || "user",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "todos",
  port: process.env.DB_PORT || 5432,
});

// Health endpoint
app.get("/health", async (req, res) => {
  try {
    // Try simple DB query
    const result = await pool.query("SELECT NOW()");
    res.status(200).send(`OK - DB time: ${result.rows[0].now}`);
  } catch (err) {
    console.error("DB connection failed:", err.message);
    res.status(500).send("DB connection failed");
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
