const express = require("express");
const cors = require("cors");

const bookRoutes = require("./routes/book");
const authorRoutes = require("./routes/author");
const genreRoutes = require("./routes/genre");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);
app.use("/genres", genreRoutes);

module.exports = app;
