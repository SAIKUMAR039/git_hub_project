const Bookmark = require("../models/Bookmark");

const addBookmark = async (req, res) => {
  const userId = req.user.id;
  const repo = req.body;

  try {
    const exists = await Bookmark.findOne({ userId, repoId: repo.id });
    if (exists) return res.status(400).json({ message: "Already bookmarked" });

    const newBookmark = await Bookmark.create({
      userId,
      repoId: repo.id,
      ...repo,
    });

    res.status(201).json(newBookmark);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to save bookmark", error: err.message });
  }
};

const getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ userId: req.user.id });
    res.json(bookmarks);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch bookmarks", error: err.message });
  }
};

const deleteBookmark = async (req, res) => {
  try {
    const { id } = req.params;

    await Bookmark.findOneAndDelete({ _id: id, userId: req.user.id });

    res.json({ message: "Bookmark removed" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete bookmark", error: err.message });
  }
};

module.exports = { addBookmark, getBookmarks, deleteBookmark };
