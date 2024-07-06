const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(request, response, next) {
  const { movieId } = request.params;

  if (!movieId) {
    return next({ status: 404, message: "Movie ID must be provided." });
  }

  try {
    const movie = await service.read(movieId);
    if (!movie) {
      return next({ status: 404, message: "Movie not found." });
    }
  
    response.locals.movie = movie;
    return next();
  } catch (error) {
    
    return next(error);
  }
}


async function read(request, response) {
  const { movie } = response.locals;
  response.json({ data: movie });
}

async function list(request, response, next) {  // Added next parameter
  const { is_showing } = request.query;
  try {
    const data = await service.list(is_showing);
    response.json({ data });
  } catch (err) {
    next(err);  // Forward any errors to the error handling middleware
  }
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
  movieExists,
};
