import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static files from "public"
app.use(express.static(path.join(__dirname, "public")));

// Default route: serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
