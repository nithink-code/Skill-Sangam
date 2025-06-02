const axios = require('axios');

const LANGUAGE_SKILL_MAP = {
  PHP: "Laravel",
  JavaScript: "React",
  TypeScript: "Angular",
  Python: "Django",
  Java: "Spring",
  "C#": ".NET",
  HTML: "Web Development",
  CSS: "Web Design",
  SQL: "Database Design"
};

async function fetchUserRepos(username) {
  const url = `https://api.github.com/users/${username}/repos`;
  const response = await axios.get(url);
  return response.data;
}

async function fetchRepoLanguages(languages_url) {
  try {
    const response = await axios.get(languages_url);
    return response.data;
  } catch {
    return {};
  }
}

function inferSkills(languagesDict) {
  const skills = new Set();
  for (const lang of Object.keys(languagesDict)) {
    if (LANGUAGE_SKILL_MAP[lang]) {
      skills.add(LANGUAGE_SKILL_MAP[lang]);
    } else {
      skills.add(lang);
    }
  }
  return Array.from(skills);
}

async function analyzeUser(username) {
  const repos = await fetchUserRepos(username);

  if (!repos || repos.length === 0) {
    return {
      username,
      has_real_project: false,
      skills: [],
      teachable_skills: []
    };
  }

  const allLanguages = {};
  const realProjects = [];

  for (const repo of repos) {
    if (repo.fork || repo.size === 0) continue;

    const langDict = await fetchRepoLanguages(repo.languages_url);

    for (const [lang, count] of Object.entries(langDict)) {
      allLanguages[lang] = (allLanguages[lang] || 0) + count;
    }

    if (repo.pushed_at && repo.size > 50) {
      realProjects.push(repo.name);
    }
  }

  const skills = inferSkills(allLanguages);

  return {
    username,
    has_real_project: realProjects.length > 0,
    skills,
    teachable_skills: realProjects.length > 0 ? skills : []
  };
}

module.exports = { analyzeUser };
