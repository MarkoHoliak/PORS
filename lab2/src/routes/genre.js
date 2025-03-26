const express = require("express");
const router = express.Router();
const genreController = require("../controllers/genreController");

router.get("/", genreController.getAllGenres);
router.get("/:id", genreController.getGenreById);
router.post("/", genreController.createGenre);

module.exports = router;
