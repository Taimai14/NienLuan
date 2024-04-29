const Comment = require("../models/Comment");

exports.MovieCommentPost = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const newComment = new Comment({
      content: req.body.content,
      user: req.user.id,
      movie: movieId,
    });

    const savedComment = await newComment.save();

    const movie = await Movie.findByIdAndUpdate(movieId, {
      $push: { comments: savedComment._id },
    });

    res.json(savedComment);
  } catch (err) {
    res.status(400).json(err);
  }
};

const MovieCommentDelete = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const commentId = req.params.commentId;

    const comment = await Comment.findByIdAndDelete({
      _id: commentId,
      movie: movieId,
    });

    if (!comment) {
      return res.status(404).json("Comment not found");
    }

    await Movie.findByIdAndUpdate(movieId, { $pull: { comments: commentId } });

    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(400).json(err);
  }
};
