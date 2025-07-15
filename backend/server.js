import express from "express";
import cors from "cors";
import genAi from "./genAi.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/generate-image", async (req, res) => {
  const { prompt } = req.body;
  try {
    const imageBase64 = await genAi(prompt);
    res.json({ image: imageBase64 }); // send the image back
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
    res.status(500).send("Error calling Google API");
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});