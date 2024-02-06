import express from "express";
import fetch from "node-fetch";
import { Keys } from "./sources/keys.js";
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

app.post("/weather", async (req, res) => {
  const { cityName } = req.body;
  if (!cityName) {
    res.status(404).send("City name is required");
    return;
  }
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${Keys.API_KEY}&units=metric`
    );
    const data = await response.json();
    res.status(200).send({ weatherText: `${cityName} ${data.main.temp}` });
  } catch (error) {
    res.status(404).send({ weatherText: "City is not found!" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
