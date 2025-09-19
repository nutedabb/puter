import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";

// Load Puter.js (browser-like import)
import("https://js.puter.com/v2/").then(puter => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  // Chat endpoint
  app.post("/chat", async (req, res) => {
    try {
      const { prompt, model } = req.body;

      const response = await puter.ai.chat(prompt, { model: model || "gpt-5-nano" });

      res.json({ text: response });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Chat failed" });
    }
  });

  // Image generation endpoint
  app.post("/image", async (req, res) => {
    try {
      const { prompt, model } = req.body;

      const imageElement = await puter.ai.txt2img(prompt, { model: model || "gpt-image-1" });

      // imageElement is a DOM node, so we grab its src
      res.json({ url: imageElement.src });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Image generation failed" });
    }
  });

  // Start server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
