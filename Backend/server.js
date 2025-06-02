const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const LANGUAGE_SKILL_MAP = {
  "PHP": "Laravel",
  "JavaScript": "React",
  "TypeScript": "Angular",
  "Python": "Django",
  "Java": "Spring",
  "C#": ".NET",
  "HTML": "Web Development",
  "CSS": "Web Design",
  "SQL": "Database Design"
};

// Async function to fetch all repos of a user
const fetchUserRepos = async (username) => {
  const url = `https://api.github.com/users/${username}/repos`;
  const response = await axios.get(url);
  return response.data;
};

// Async function to fetch languages used in a repo
const fetchRepoLanguages = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

// Infers teachable skills based on used languages
const inferSkills = (languagesDict) => {
  const skills = new Set();
  for (const lang in languagesDict) {
    skills.add(LANGUAGE_SKILL_MAP[lang] || lang);
  }
  return [...skills];
};

// Main analysis endpoint (async)
app.get('/analyze/:username', async (req, res) => {
  const username = req.params.username;

  try {
    const repos = await fetchUserRepos(username);
    const realProjects = [];
    const allLanguages = {};

    for (const repo of repos) {
      if (repo.fork || repo.size === 0) continue;

      const langDict = await fetchRepoLanguages(repo.languages_url);
      for (const [lang, value] of Object.entries(langDict)) {
        allLanguages[lang] = (allLanguages[lang] || 0) + value;
      }

      if (repo.pushed_at && repo.size > 50) {
        realProjects.push(repo.name);
      }
    }

    const skills = inferSkills(allLanguages);
    const consistency = realProjects.length >= 10
      ? "Expert"
      : realProjects.length >= 5
      ? "Intermediate"
      : "Beginner";

    res.json({
      username,
      has_real_project: realProjects.length > 0,
      skills,
      teachable_skills: realProjects.length > 0 ? skills : [],
      consistency
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "GitHub analysis failed." });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
