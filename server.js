import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Serve everything inside "public" folder
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
