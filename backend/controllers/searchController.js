const axios = require("axios");

const searchGitHubRepos = async (req, res) => {
  const query = req.query.query;

  if (!query) {
    return res.status(400).json({ message: "Query is required" });
  }

  try {
    const response = await axios.get(
      `https://api.github.com/search/repositories?q=${query}&per_page=10`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, // Optional if you hit rate limits
        },
      }
    );

    const repos = response.data.items.map((repo) => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      html_url: repo.html_url,
      owner: {
        login: repo.owner.login,
        avatar_url: repo.owner.avatar_url,
        html_url: repo.owner.html_url,
      },
    }));

    res.json(repos);
  } catch (error) {
    console.error("GitHub API Error:", error.message);
    res.status(500).json({ message: "GitHub API failed" });
  }
};

module.exports = { searchGitHubRepos };
