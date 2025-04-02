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

app.post("/applicants", (req, res) => {
  const { name, faculty } = req.body;
  const applicants = readData();

  const newApplicant = {
    id: Date.now().toString(),
    name,
    faculty,
    scores: { subjects: [], certificate: 0 },
    totalScore: 0,
    enrolled: false,
  };

  applicants.push(newApplicant);
  writeData(applicants);
  res.status(201).json(newApplicant);
});

app.put("/applicants/:id/scores", (req, res) => {
  const { subjects, certificate } = req.body;
  const applicants = readData();
  const applicant = applicants.find((a) => a.id === req.params.id);

  if (!applicant) return res.status(404).json({ error: "Абітурієнт не знайдений" });

  applicant.scores.subjects = subjects;
  applicant.scores.certificate = certificate;
  applicant.totalScore = subjects.reduce((sum, s) => sum + s.score, 0) + certificate;
  applicant.enrolled = applicant.totalScore >= 180; 

  writeData(applicants);
  res.json(applicant);
});

app.get("/applicants", (req, res) => {
  res.json(readData());
});

app.get("/applicants/enrolled", (req, res) => {
  res.json(readData().filter((a) => a.enrolled));
});

app.delete("/applicants/:id", (req, res) => {
  let applicants = readData();
  applicants = applicants.filter((a) => a.id !== req.params.id);
  writeData(applicants);
  res.json({ message: "Абітурієнта видалено" });
});

const PORT = 3009;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
