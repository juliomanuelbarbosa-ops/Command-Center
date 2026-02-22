import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";

const db = new Database("command_center.db");

// Initialize DB
db.exec(`
  CREATE TABLE IF NOT EXISTS neural_library (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT,
    type TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS mission_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    xp INTEGER,
    streak INTEGER,
    last_sync DATETIME
  );
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/neural-library", (req, res) => {
    const items = db.prepare("SELECT * FROM neural_library ORDER BY timestamp DESC").all();
    res.json(items);
  });

  app.post("/api/neural-library", (req, res) => {
    const { title, content, type } = req.body;
    const info = db.prepare("INSERT INTO neural_library (title, content, type) VALUES (?, ?, ?)").run(title, content, type);
    res.json({ id: info.lastInsertRowid });
  });

  app.get("/api/mission-status", (req, res) => {
    const status = db.prepare("SELECT * FROM mission_log LIMIT 1").get();
    res.json(status || { xp: 0, streak: 0 });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Command Center Server running on http://localhost:${PORT}`);
  });
}

startServer();
