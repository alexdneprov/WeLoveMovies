const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


async function list(request, response, next) {
  console.log(`here`);
  try {
    const theaters = await service.list();
    response.json({ data: theaters });
  } catch (error) {
    next(error);
  }
}

async function listByMovieId(request, response, next) {
  
  const { movieId } = request.params;
  try {
    // Get all theaters with movies
    const theaters = await service.list();

    // Filter theaters where the specific movie is playing
    const filteredTheaters = theaters.filter(theater => 
      theater.movies.some(movie => movie.movie_id === Number(movieId))
    );

    if (filteredTheaters.length > 0) {
      response.json({ data: filteredTheaters });
    } else {
      response.status(404).json({ error: "No theaters found for this movie." });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  list: asyncErrorBoundary(list),
  listByMovieId: asyncErrorBoundary(listByMovieId),
};