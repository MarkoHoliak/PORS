
const { genres } = require("../data");

exports.getAllGenres = (req, res) => res.json(genres);

exports.getGenreById = (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).json({ message: "Жанр не знайдено" });
  res.json(genre);
};

exports.createGenre = (req, res) => {
  const { name } = req.body;
  const newGenre = { id: genres.length + 1, name };
  genres.push(newGenre);
  res.status(201).json(newGenre);
};
