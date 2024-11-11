const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

 router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,{$set: req.body,},{ new: true });
      res.status(200).send(updatedUser);
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(401).send("Not Allowed");
  }
});

 router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send("User has been deleted...");
      } catch (err) {
        res.status(500).send(err);
      }
    } catch (err) {
      res.status(404).send("User not found!");
    }
  } else {
    res.status(401).send("Not Allowed");
  }
});

 router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).send(others);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
