const express = require("express");
const { searchGitHubRepos } = require("../controllers/searchController");

const router = express.Router();

// GET /api/search?query=react
router.get("/", searchGitHubRepos);

module.exports = router;
