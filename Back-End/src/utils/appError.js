// Author: Artem Nikulin

// Custom application error class that provides additional properties for status code, status, and operational error handling.
class AppError extends Error {
  /**
   * Constructs a new AppError instance.
   * @param {string} message - The error message.
   * @param {number} statusCode - The HTTP status code associated with the error.
   */

  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    // Determine status based on the status code
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    // Flag indicating if the error is operational (as opposed to programming or other unknown errors)
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
