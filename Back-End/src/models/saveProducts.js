// Author: Artem Nikulin

const db = require('../db');
const AppError = require('../utils/appError');

// Saves a product to the database. If the product already exists (based on the code), it updates the existing record.
const saveProducts = async (product) => {
  // SQL query to insert a new product or update the existing one if the code already exists
  const query = `
    INSERT INTO products (code, model, title, category_id, category, brand_id, brand, weight, height, width, length, description, change_at, image_link, tags)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
    ON CONFLICT (code) DO UPDATE
    SET model = excluded.model,
        title = excluded.title,
        category_id = excluded.category_id,
        category = excluded.category,
        brand_id = excluded.brand_id,
        brand = excluded.brand,
        weight = excluded.weight,
        height = excluded.height,
        width = excluded.width,
        length = excluded.length,
        description = excluded.description,
        change_at = excluded.change_at,
        image_link = excluded.image_link,
        tags = excluded.tags;
  `;

  // Array of values to be inserted/updated in the query
  const values = [
    product.code,
    product.model,
    product.title,
    product.category_id,
    product.category,
    product.brand_id,
    product.brand,
    product.weight,
    product.height,
    product.width,
    product.length,
    product.description,
    product.change_at,
    JSON.stringify(product.image_link),
    JSON.stringify(product.tags),
  ];

  try {
    // Execute the query with the provided values
    await db.query(query, values);
  } catch (error) {
    // Wrap the error in an AppError and throw it
    throw new AppError('Failed to save product', 500);
  }
};

module.exports = {
  saveProducts,
};
