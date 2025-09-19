import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";

// Use dynamic import for the browser bundle
const loadPuter = async () => {
  const puter = await import("https://js.puter.com/v2/");
  return puter;
};

const app = express();
app.use(cors());
app.use(bodyParser.json());

let puterInstance = null;

// Ensure Puter is loaded before handling requests
(async () => {
  puterInstance = await loadPuter();
})();

// Chat endpoint
app.post("/chat", async (req, res) => {
  try {
    if (!puterInstance) {
      return res.status(503).json({ error: "Puter not initialized yet" });
    }

    const { prompt, model } = req.body;
    const response = await puterInstance.ai.chat(prompt, {
      model: model || "gpt-5-nano",
    });

    res.json({ text: response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Chat failed" });
  }
});

// Health check route
app.get("/", (req, res) => {
  res.send("🚀 Puter AI API is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
