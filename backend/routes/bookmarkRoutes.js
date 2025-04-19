const express = require("express");
const {
  addBookmark,
  getBookmarks,
  deleteBookmark,
} = require("../controllers/bookmarkController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, addBookmark); // Save repo
router.get("/", protect, getBookmarks); // Get user bookmarks
router.delete("/:repoId", protect, deleteBookmark); // Remove by repo ID

module.exports = router;
