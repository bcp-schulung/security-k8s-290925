const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 80;

// Backend URL (from env variable or default to service name in K8s)
const BACKEND_URL = process.env.BACKEND_URL || "http://backend:3000";

app.get("/", async (req, res) => {
  try {
    // Try calling backend
    const response = await axios.get(`${BACKEND_URL}/health`);
    if (response.status === 200) {
      return res.send("Hello World");
    }
  } catch (err) {
    console.error("Backend not reachable:", err.message);
    return res.status(500).send("Backend not reachable");
  }
});

app.listen(PORT, () => {
  console.log(`Frontend running on port ${PORT}`);
});
