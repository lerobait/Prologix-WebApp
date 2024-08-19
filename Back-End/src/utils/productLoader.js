// Author: Artem Nikulin

const AppError = require('../utils/appError');
const { processCategory } = require('./categoryProcessor');

/**
 * Loads or updates products for all categories specified in the environment variable.
 * @param {boolean} isInitialLoad - Flag to indicate if this is an initial load or update.
 * @returns {Promise<void>} - A promise that resolves when the load or update is complete.
 * @throws {AppError} - Throws an AppError if there is an issue during the process.
 */

const loadOrUpdateProducts = async (isInitialLoad) => {
  try {
    // Get category IDs from environment variable and trim any extra spaces
    const categoryIds = process.env.CATEGORY_IDS.split(',').map((id) =>
      id.trim()
    );

    // Process each category
    for (const categoryId of categoryIds) {
      await processCategory(categoryId);
    }
  } catch (error) {
    // Handle errors, distinguishing between operational and other errors
    if (error instanceof AppError) {
      throw error;
    } else {
      throw new AppError(
        `${isInitialLoad ? 'Initial load' : 'Update'} error: ${error.message}`,
        500
      );
    }
  }
};

module.exports = { loadOrUpdateProducts };
