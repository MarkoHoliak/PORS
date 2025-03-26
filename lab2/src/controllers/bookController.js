const { books } = require("../data");

exports.getAllBooks = (req, res) => res.json(books);

exports.getBookById = (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Книгу не знайдено" });
  res.json(book);
};

exports.createBook = (req, res) => {
  const { title, authorId, genreId } = req.body;
  const newBook = { id: books.length + 1, title, authorId, genreId };
  books.push(newBook);
  res.status(201).json(newBook);
};

exports.updateBook = (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Книгу не знайдено" });

  book.title = req.body.title || book.title;
  res.json(book);
};

exports.deleteBook = (req, res) => {
  const index = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Книгу не знайдено" });

  books.splice(index, 1);
  res.status(204).send();
};
