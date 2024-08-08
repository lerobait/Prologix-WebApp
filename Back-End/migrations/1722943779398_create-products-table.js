// Author: Artem Nikulin

/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */

// Define and create the 'products' table
exports.up = (pgm) => {
  pgm.createTable('products', {
    code: { type: 'varchar(255)', primaryKey: true }, // Unique product code
    model: { type: 'varchar(255)' }, // Product model
    title: { type: 'text' }, // Product title
    category_id: { type: 'int' }, // Category ID
    category: { type: 'varchar(255)' }, // Category name
    brand_id: { type: 'int' }, // Brand ID
    brand: { type: 'varchar(255)' }, // Brand name
    weight: { type: 'int' }, // Product weight
    height: { type: 'int' }, // Product height
    width: { type: 'int' }, // Product width
    length: { type: 'int' }, // Product length
    description: { type: 'text' }, // Product description
    change_at: { type: 'timestamptz' }, // Last change timestamp
    image_link: { type: 'jsonb' }, // Image links in JSON format
    tags: { type: 'jsonb' }, // Product tags in JSON format
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */

// Drop the 'products' table
exports.down = (pgm) => {
  pgm.dropTable('products');
};
