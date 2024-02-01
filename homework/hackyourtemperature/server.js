import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

app.post("/weather", (req, res) => {
  const { cityName } = req.body;
  if (!cityName) {
    res.status(404).send("Error: You should enter the city name");
  } 
    res.json(`You entered: ${cityName}`);
  
});

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
