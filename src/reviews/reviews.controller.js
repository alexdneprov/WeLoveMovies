const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const methodNotAllowed = require("../errors/methodNotAllowed");

async function reviewExists(request, response, next) {
  const { reviewId } = request.params;
  const review = await service.read(reviewId);

  if (review) {
    response.locals.review = review;
    return next();
  } else {
    return next({ status: 404, message: `Review with ID ${reviewId} cannot be found` });
  }
}

async function destroy(request, response) {
  const {reviewId} = request.params;
  const deletedReview = await service.destroy(reviewId);
  
  response.status(204).json({data: deletedReview});

}

async function list(request, response, next) {
  const { movieId } = request.params;
  try {
    const reviews = await service.list(movieId);
    response.json({data: reviews});
   
  } catch (error) {
    next(error); 
  }
}

function hasMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return next();
  }
  methodNotAllowed(request, response, next);
}

function noMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return methodNotAllowed(request, response, next);
  }
  next();
}

async function update(request, response) {
  const { reviewId } = request.params;
  const newReview = request.body;
  console.log(reviewId); 
  console.log(newReview);                                           // WHY THE BODY IS UNDEFINED?? 
  
  
  const updatedReview = {
    ...response.locals.review,
    ...request.body.data,
    review_id: response.locals.review.review_id,
  };
  
  const upd = await service.update(updatedReview);
    
  response.status(200).json({ data: upd });
}

module.exports = {
  destroy: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(destroy),
  ],
  list: [hasMovieIdInPath, asyncErrorBoundary(list)],
  update: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(update),
  ],
};
