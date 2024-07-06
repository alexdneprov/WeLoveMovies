const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const theatersController = require("../theaters/theaters.controller");
const reviewsController = require("../reviews/reviews.controller");
const handle404 = require("../errors/404");


const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");

router.route("/:movieId/theaters")
  .get(controller.movieExists, theatersController.listByMovieId)
  .all(methodNotAllowed);

router.use("/:movieId/reviews", reviewsRouter);

router.route("/:movieId/critics").all(handle404);
router.route("/:movieId").get(controller.read).all(methodNotAllowed);
router.route("/").get(controller.list).all(methodNotAllowed);





module.exports = router;
