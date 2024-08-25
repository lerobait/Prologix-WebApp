// Author: Artem Nikulin

AppError = require('./appError');

// Middleware function to handle 404 Not Found errors
const handleNotFound = (req, res, next) => {
  // Pass a new instance of AppError to the next middleware
  // with a message 'Not found' and status code 404
  next(new AppError('Not found', 404));
};

// Global error handling middleware
const handleErrors = (err, req, res, next) => {
  // Make the error message and error object available to the view
  res.locals.message = err.message;

  // Conditionally set the error object for development environment
  // In production, only send an empty object to avoid exposing stack traces
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Determine the status code from the error object or default to 500
  const statusCode = err.statusCode || 500;

  // Set the response status code
  res.status(statusCode);

  // Render the error page
  res.render('error');
};

module.exports = {
  handleNotFound,
  handleErrors,
};
