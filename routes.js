const express = require("express");
const router = express.Router();
const Animal = require("./models/Animal");
const bodyParser = require("body-parser");
const Feeding = require("./models/Feeding");

// application/json parser
const jsonParser = bodyParser.json();

// animals GET
router.get("/animals", async (req, res) => {
  const animals = await Animal.find();
  console.log(animals);
  res.send(animals);
});

// animals GET by Id
router.get("/animals/:id", async (req, res) => {
  const { id: _id } = req.params;
  const animals = await Animal.findById(_id);
  console.log(animals);
  res.send(animals);
});

// animals POST
router.post("/animals", jsonParser, async (req, res, next) => {
  console.log('red body',req.body);

  const animal = new Animal({
    name: req.body.name,
    latin_name: req.body.latin_name,
    animal_type: req.body.animal_type,
    active_time: req.body.active_time,
    length_min: req.body.length_min,
    length_max: req.body.length_max,
    lifespan: req.body.lifespan,
    habitat: req.body.habitat,
    diet: req.body.diet,
    geo_range: req.body.geo_range,
    image_link: req.body.image_link,
  });
  

  await animal.save(function (err, animal) {
    if (err) {
      return next(err);
    }
    res.send(201, animal);
  });
});

// animals DELETE by Id

router.delete("/animals/:id", async (req, res) => {
  const { id: _id } = req.params;
  console.log("testing id zoo", req);
  console.log("my req", req);

  const animals = await Animal.findByIdAndDelete(_id);
  console.log("is deleting zoo", animals);

  if (animals == null || undefined) {
    console.log("delete animal", animals);
  }

  res.send("is delete", animals);
});

// animals PUT
router.put("/animals/:id", jsonParser, async (req, res) => {
  console.log("hello");
  const { id: _id } = req.params;
  const newAnimal = {
    _id,
    name: req.body.name,
    latin_name: req.body.latin_name,
    animal_type: req.body.animal_type,
    active_time: req.body.active_time,
    length_min: req.body.length_min,
    length_max: req.body.length_max,
    lifespan: req.body.lifespan,
    habitat: req.body.habitat,
    diet: req.body.diet,
    geo_range: req.body.geo_range,
    image_link: req.body.image_link,
  };

  Animal.findByIdAndUpdate(_id, newAnimal, (err) => {
    if (err) {
      res.json({
        newAnimal,
        success: false,
        msg: "Failed to update animal",
      });
    } else {
      res.json({ newAnimal, success: true, msg: "Animal updated" });
    }
  });
});

// feedings GET
router.get("/feedings", async (req, res) => {
  const feedings = await Feeding.find();
  console.log(feedings);
  res.send(feedings);
});

// feedings POST
router.post("/feedings", jsonParser, async (req, res, next) => {
  console.log(req.body);
  const feeding = new Feeding({
    animal_name: req.body.animal_name,
    diet: req.body.diet,
    zoo_assistant: req.body.zoo_assistant,
  });
  feeding.save(function (err, feeding) {
    if (err) {
      return next(err);
    }
    res.send(201, feeding);
  });
});
// feedings PUT
router.put("/feedings/:id", jsonParser, async (req, res) => {
  console.log("hello");
  const { id: _id } = req.params;
  const newFeeding = {
    _id,
    animal_name: req.body.animal_name,
    diet: req.body.diet,
    zoo_assistant: req.body.zoo_assistant,
  };

  Feeding.findByIdAndUpdate(_id, newFeeding, (err) => {
    if (err) {
      res.json({
        newFeeding,
        success: false,
        msg: "Failed to update feeding",
      });
    } else {
      res.json({ newFeeding, success: true, msg: "Feeding updated" });
    }
  });
});

module.exports = router;
