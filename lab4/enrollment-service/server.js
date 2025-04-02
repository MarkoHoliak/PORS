const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const APPLICANT_SERVICE_URL = "http://applicant-service:3001";

app.get("/enrollment", async (req, res) => {
  try {
    const { data: applicant } = await axios.get(`${APPLICANT_SERVICE_URL}/applicants`);

    const enrolledApplicants = applicant.filter((a) => a.enrolled);
    res.json(enrolledApplicants);
  } catch (error) {
    res.status(500).json({ error: "Помилка отримання зарахованих абітурієнтів" });
  }
});

const PORT = 3003;
app.listen(PORT, () => console.log(`Enrollment Service running on port ${PORT}`));
