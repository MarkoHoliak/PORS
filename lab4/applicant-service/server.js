const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

const FILE_PATH = path.join(__dirname, "applicants.json");

const readData = () => {
  if (!fs.existsSync(FILE_PATH)) fs.writeFileSync(FILE_PATH, "[]");
  return JSON.parse(fs.readFileSync(FILE_PATH));
};

const writeData = (data) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
};

// Додати абітурієнта
app.post("/applicants", (req, res) => {
  const applicants = readData();
  const newApplicant = { id: `${Date.now()}`, ...req.body, enrolled: false, totalScore: 0 };
  applicants.push(newApplicant);
  writeData(applicants);
  res.status(201).json(newApplicant);
});

// Отримати всіх абітурієнтів
app.get("/applicants", (req, res) => {
  res.json(readData());
});

// Отримати одного абітурієнта
app.get("/applicants/:id", (req, res) => {
  const applicant = readData().find((a) => a.id === req.params.id);
  if (!applicant) return res.status(404).json({ error: "Абітурієнт не знайдений" });
  res.json(applicant);
});

// Оновити абітурієнта
app.put("/applicants/:id", (req, res) => {
  const applicants = readData();
  const index = applicants.findIndex((a) => a.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Абітурієнт не знайдений" });

  applicants[index] = req.body;
  writeData(applicants);
  res.json(applicants[index]);
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Applicant Service running on port ${PORT}`));
