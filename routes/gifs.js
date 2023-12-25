const express = require("express");
const {
  getRandomGif,
  getGifs,
  getGif,
  createGif,
  deleteGif,
  updateGif,
} = require("../controllers/gifController");
const requireAuth = require("../middleware/requireAuth");
const requireAdmin = require("../middleware/requireAdmin");

const router = express.Router();

// All routes in this file are protected
router.use(requireAuth);

// GET a random Gif
router.get("/random", getRandomGif);

// These routes needs to have admin access
router.use(requireAdmin);

// GET all Gifs
router.get("/", getGifs);

//GET a single Gif
router.get("/:id", getGif);

// POST a new Blog
router.post("/", createGif);

// DELETE a Blog
router.delete("/:id", deleteGif);

// UPDATE a Blog
router.patch("/:id", updateGif);

module.exports = router;
// varun gandu
