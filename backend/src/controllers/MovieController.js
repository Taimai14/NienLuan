const Movie = require("../models/Movie");
const Comment = require("../models/Comment");

//them phim
const MoviePost = async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body);

    try {
      const savedMovie = await newMovie.save();
      res.status(201).json(savedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("ko co quyen truy cap");
  }
};

//cap nhat phim

const MovieUpdate = async (req, res) => {
  if (req.user.isAdmin) {
    const updatedMovie = new Movie(req.body);

    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("ko co quyen truy cap");
  }
};

//xoa phim
const MovieDelete = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      res.status(200).json("da xoa phim");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("ko co quyen truy cap");
  }
};

//tim phim
const MovieFind = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(201).json(movie);
  } catch (err) {
    res.status(403).json(err);
  }
};

//tim phim ngau nhien
const MovieRandom = async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
};

//lay ra tat ca cac phim
const MovieAll = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
};

const MovieCommentPost = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const newComment = new Comment({
      content: req.body.content,
      user: req.user.id,
      movie: req.params.id,
      timeSinceCreated: calculateTimeSince(new Date()),
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

function calculateTimeSince(currentDate) {
  const then = new Date(currentDate);
  const now = new Date();
  const diffMs = Math.abs(now - then);
  const diffMins =
    Math.round(((diffMs % (1000 * 60 * 60)) / (1000 * 60)) * 100) / 100;
  const diffHrs = Math.round((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (diffHrs === 0) {
    return `${diffMins} minute(s) ago`;
  } else {
    return `${diffHrs} hour(s) ago`;
  }
}

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

const GetMovieComments = async (req, res) => {
  try {
    const movieId = req.params.id;

    const comments = await Comment.find({ movie: movieId }).populate(
      "user",
      "username"
    );

    res.json(comments);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  MoviePost,
  MovieDelete,
  MovieUpdate,
  MovieFind,
  MovieRandom,
  MovieAll,
  MovieCommentPost,
  MovieCommentDelete,
  GetMovieComments,
};
