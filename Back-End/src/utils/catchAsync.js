// Author: Artem Nikulin

/**
 * A higher-order function that wraps an asynchronous function to catch errors and pass them to the next middleware.
 * @param {Function} fn - The asynchronous function to wrap.
 * @returns {Function} - A new function that executes the original function and catches any errors.
 */

module.exports = (fn) => (req, res, next) => {
  // Call the async function and attach a catch handler to forward any errors to the next middleware
  fn(req, res, next).catch(next);
};
