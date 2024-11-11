const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const saved = await newPost.save();
    res.status(200).send(saved);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updated = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).send(updated);
      } catch (err) {
        res.status(500).send(err);
      }
    } else {
      res.status(401).send("not Allowed");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).send("Post Deleted");
      } catch (err) {
        res.status(500).send(err);
      }
    } else {
      res.status(401).send("Not Allowed");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).send(post);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/", async (req, res) => {
  const username = req.query.user;
  const Name = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (Name) {
      posts = await Post.find({
        categories: {
          $in: [Name],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).send(posts);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
