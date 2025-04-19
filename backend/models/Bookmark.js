const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    repoId: Number,
    name: String,
    full_name: String,
    description: String,
    stars: Number,
    forks: Number,
    language: String,
    html_url: String,
    owner: {
      login: String,
      avatar_url: String,
      html_url: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bookmark", bookmarkSchema);
