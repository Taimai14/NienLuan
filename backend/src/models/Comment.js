const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  timeSinceCreated: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
