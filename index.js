const express = require("express");
const animals = require("./src/data/animals.json");

const app = express();

const port = 8000;

app.get("/animals", (req, res) => {
  const { category } = req.query;

  let filteredAnimals = animals;

  if (category) {
    filteredAnimals = animals.filter((a) => a.category === category);
  }

  const limit = parseInt(req.query.limit, 10) || 10;

  res.json(filteredAnimals.slice(0, limit));
});

app.get("/animals/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id))
    res.status(403).json({
      error: 403,
      message: "This is not a number",
    });

  const currentAnimal = animals.find((a) => a.id === id);

  if (currentAnimal) res.json(currentAnimal);

  res.sendStatus(404);
});

app.listen(port, (err) => {
  if (err) {
    console.log("Something went wrong");
    return;
  }

  console.log(`Server is listening on port ${port} 🚀`);
});
