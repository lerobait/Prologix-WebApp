// Author: Nikonov Kirill

/**
 * Ensures that the provided data is wrapped in an array.
 * If the data is already an array, it is returned as is.
 * If the data is not an array, it is wrapped in a new array.
 *
 * @param {any} data - The data to check and ensure as an array
 * @returns {Array} - The data wrapped in an array if it wasn't already one
 */
function ensureArray(data) {
    return Array.isArray(data) ? data : [data];
  }
  
module.exports = ensureArray;