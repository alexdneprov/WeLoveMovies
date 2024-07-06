function errorHandler(error, request, response, next) {
  const { status = 500, message = "Internal Server Error" } = error;

  // Ensure status code is set
  response.status(status);
  
  // Send error message in response body
  response.json({ 
    status, 
    error: message 
  });
}

module.exports = errorHandler;