const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const APPLICANT_SERVICE_URL = "http://applicant-service:3001";

app.put("/scores/:id", async (req, res) => {
  const { subjects, certificate } = req.body;

  try {
    const { data: applicant } = await axios.get(`${APPLICANT_SERVICE_URL}/applicants/${req.params.id}`);

    if (!applicant) return res.status(404).json({ error: "Абітурієнт не знайдений" });

    applicant.scores = { subjects, certificate };
    applicant.totalScore = subjects.reduce((sum, s) => sum + s.score, 0) + certificate;
    applicant.enrolled = applicant.totalScore >= 180;

    await axios.put(`${APPLICANT_SERVICE_URL}/applicants/${req.params.id}`, applicant);

    res.json(applicant);
  } catch (error) {
    res.status(500).json({ error: "Помилка оновлення балів" });
  }
});

const PORT = 3002;
app.listen(PORT, () => console.log(`Scores Service running on port ${PORT}`));
