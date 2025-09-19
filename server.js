import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";

// Import Puter in Node (not in browser)
import puter from "@puter-ai/js"; // if available in npm

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Chat endpoint
app.post("/chat", async (req, res) => {
  try {
    const { prompt, model } = req.body;

    // Call Puter AI
    const response = await puter.ai.chat(prompt, { model: model || "gpt-5-nano" });

    res.json({ text: response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Chat failed" });
  }
});

// Root route (for health check)
app.get("/", (req, res) => {
  res.send("🚀 Puter AI API is running");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
