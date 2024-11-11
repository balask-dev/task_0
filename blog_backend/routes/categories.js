const router = require("express").Router();
const Category = require("../models/Category");

router.post("/", async (req, res) => {
  const newOne = new Category(req.body);
  try {
    const saved = await newOne.save();
    res.status(200).send(saved);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/", async (req, res) => {
    try {
      const cat = await Category.find();
      res.status(200).send(cat);
    } catch (err) {
      res.status(500).send(err);
    }
  });

module.exports = router;
