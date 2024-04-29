const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, require: true, unique: true },
    desc: { type: String },
    img: { type: String },
    trailer: { type: String },
    video: { type: String },
    year: { type: String },
    genre: { type: String },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes: { type: Array, default: [] },
    isSeries: { type: Boolean, default: false },
  },

  {
    timestamps: true,
  }
);

const ReviewSchema = new mongoose.Schema({
  user: { type: String, require: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
  rating: { type: Number, require: true },
  comment: { type: String },
});

module.exports = mongoose.model("Review", ReviewSchema);
module.exports = mongoose.model("Movie", MovieSchema);
