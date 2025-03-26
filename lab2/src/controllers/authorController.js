const { authors } = require("../data");

exports.getAllAuthors = (req, res) => res.json(authors);

exports.getAuthorById = (req, res) => {
  const author = authors.find((a) => a.id === parseInt(req.params.id));
  if (!author) return res.status(404).json({ message: "Автора не знайдено" });
  res.json(author);
};

exports.createAuthor = (req, res) => {
  const { name } = req.body;
  const newAuthor = { id: authors.length + 1, name };
  authors.push(newAuthor);
  res.status(201).json(newAuthor);
};
