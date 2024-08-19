// Author: Artem Nikulin

const AppError = require('../utils/appError');
const dotenv = require('dotenv');
const axios = require('axios');
const { parseStringPromise } = require('xml2js');

// Load environment variables from the .env file
dotenv.config({ path: '../../.env' });

/**
 * Fetches products from an external API and parses the XML response to JSON.
 * @param {number} categoryId - The ID of the category to fetch products for.
 * @returns {Promise<Object>} - A promise that resolves to the parsed JSON data.
 * @throws {AppError} - Throws an AppError if the API request fails or no data is returned.
 */

const fetchProducts = async (categoryId) => {
  try {
    // Construct the API request URL using environment variables and category ID
    const apiUrl = `${process.env.API_URL}`;
    const token = process.env.API_TOKEN;
    const url = `${apiUrl}?token=${token}&categoryId=${categoryId}`;

    // Make a GET request to the API
    const response = await axios.get(url);

    // Check if the response contains data
    if (response.data) {
      const xmlData = response.data;
      // Parse the XML response to JSON
      const jsonData = await parseStringPromise(xmlData, {
        // Option to prevent arrays for single elements
        explicitArray: false,
      });
      // Return the parsed JSON data
      return jsonData;
    } else {
      // Throw an error if no data is returned from the API
      throw new AppError('No data returned from the API', 404);
    }
  } catch (error) {
    // Handle different types of errors
    if (error.response) {
      // Error response from the API
      throw new AppError(
        `API request failed with status ${error.response.status}`,
        error.response.status
      );
    } else if (error.request) {
      // No response received from the API
      throw new AppError('No response received from the API', 503);
    } else {
      // Other errors
      throw new AppError(`Error fetching products: ${error.message}`, 500);
    }
  }
};

module.exports = { fetchProducts };
