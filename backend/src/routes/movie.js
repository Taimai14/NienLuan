const {
  MoviePost,
  MovieDelete,
  MovieUpdate,
  MovieFind,
  MovieRandom,
  MovieAll,
  MovieCommentPost,
  MovieCommentDelete,
  GetMovieComments,
} = require("../controllers/MovieController");
const verify = require("../verifyToken");
const router = require("express").Router();
const Movie = require("../models/Movie");
router.post("/", verify, MoviePost);
router.put("/:id", verify, MovieUpdate);
router.delete("/:id", verify, MovieDelete);
router.get("/find/:id", verify, MovieFind);
router.get("/random", verify, MovieRandom);
router.get("/", verify, MovieAll);
router.post("/comments/:id", verify, MovieCommentPost);
router.delete("/comments/:id/:commentId", verify, MovieCommentDelete);
router.get("/comments/:id", verify, GetMovieComments);
router.put("/like/:id", verify, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    const userId = req.user.id;
    if (
      movie.likes.filter((like) => like.user.toString() == userId).length > 0
    ) {
      return res.status(400).json("da like");
    }

    movie.likes.unshift({ user: userId });

    await movie.save();

    res.json(movie.likes);
  } catch (err) {
    res.status(403).json(err);
  }
});

router.put("/unlike/:id", verify, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (
      movie.likes.filter((like) => like.user.toString() == req.user.id)
        .length === 0
    ) {
      return res.status(400).json("chua co like");
    }

    const removeMovie = movie.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    movie.likes.splice(removeMovie, 1);

    await movie.save();

    res.json(movie.likes);
  } catch (err) {
    res.status(403).json(err);
  }
});

module.exports = router;
