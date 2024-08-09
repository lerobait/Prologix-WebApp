// Authors: Artem Nikulin & Nikonov Kirill

const AppError = require('../utils/appError');
const { saveProducts } = require('../models/saveProducts');
const { fetchProducts } = require('./fetchProducts');
const ensureArray = require('../utils/ensureArray');
const prologix_brand_id = 49;

/**
 * Processes a category by fetching products and saving them to the database.
 * @param {number} categoryId - The ID of the category to process.
 * @returns {Promise<void>} - A promise that resolves when the category processing is complete.
 * @throws {AppError} - Throws an AppError if there is an issue with data structure or processing.
 */

const processCategory = async (categoryId) => {
  try {
    // Fetch products for the given category ID
    const products = await fetchProducts(categoryId);

    // Check if the products object has the expected structure
    if (
      products &&
      products.DCLink &&
      products.DCLink.offers &&
      products.DCLink.offers.offer
    ) {

      // Ensure that 'offer' is always an array
      const offers = ensureArray(products.DCLink.offers.offer);

      // Filter the products to include only those with the specified brand ID
      const filteredProducts = offers.filter((product) => product.brand_id == prologix_brand_id);

      // Process each product
      for (const product of filteredProducts) {
        // Transform the product data into the format expected by the database
        const transformedProduct = {
          code: product.code || '',
          model: product.model || '',
          title: product.title || '',
          category_id: Number.isNaN(parseInt(product.category_id, 10))
            ? null
            : parseInt(product.category_id, 10),
          category: product.category || '',
          brand_id: Number.isNaN(parseInt(product.brand_id, 10))
            ? null
            : parseInt(product.brand_id, 10),
          brand: product.brand || '',
          weight: Number.isNaN(parseInt(product.weight, 10))
            ? null
            : parseInt(product.weight, 10),
          height: Number.isNaN(parseInt(product.height, 10))
            ? null
            : parseInt(product.height, 10),
          width: Number.isNaN(parseInt(product.width, 10))
            ? null
            : parseInt(product.width, 10),
          length: Number.isNaN(parseInt(product.length, 10))
            ? null
            : parseInt(product.length, 10),
          description: product.description || '',
          change_at: product.change_at || null,
          image_link: ensureArray(product.image_link?.picture || []),
          tags: ensureArray(product.tags?.param || []).map((tag) => ({
            id: tag.$.id || '',
            name: tag.$.name || '',
            value: tag._ || '',
          })),
        };

        // Save the transformed product data to the database
        await saveProducts(transformedProduct);
      }
    } else {
      // Throw an error if the data structure is unexpected
      throw new AppError(
        `Unexpected data structure for categoryId ${categoryId}`,
        500
      );
    }
  } catch (error) {
    // Handle errors, distinguishing between operational and other errors
    if (error instanceof AppError) {
      throw error;
    } else {
      throw new AppError(
        `Error processing categoryId ${categoryId}: ${error.message}`,
        500
      );
    }
  }
};

module.exports = { processCategory };
