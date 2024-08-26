// Author: Artem Nikulin & Nikonov Kirill

const ProductService = require('../models/productService');
const catchAsync = require('../utils/catchAsync');

class ViewsController {
  // Method to render the product overview page with a list of products
  renderProductsOverview = catchAsync(async (req, res) => {
    // Extract query parameters for categories, page, and limit
    const { categories, page, limit } = req.query;

    // Call the ProductService to get products based on the provided query parameters
    const result = await ProductService.getProducts({
      categories,
      page,
      limit,
    });

    // Render the 'overview' Pug template with a title and the result data
    res.status(200).render('overview', {
      title: 'Prologix - Головна', // Title of the page
      ...result, // Spread the result object to include products data in the template
    });
  });

  // Method to render the search results page with products matching the search query
  renderSearchResults = catchAsync(async (req, res) => {
    // Extract query parameters for search term, page, and limit
    const { search, page, limit } = req.query;

    // Call the ProductService to search for products based on the provided query parameters
    const result = await ProductService.searchProducts({
      search,
      page,
      limit,
    });

    // Render the 'overview' Pug template with a title and the search results
    res.status(200).render('overview', {
      title: 'Search Results', // Title of the search results page
      ...result, // Spread the result object to include search results data in the template
    });
  });

  // Method to render the product details page for a specific product identified by code
  renderProductByCode = catchAsync(async (req, res) => {
    // Extract the product code from the route parameters
    const { code } = req.params;

    // Call the ProductService to get the product details based on the provided code
    const product = await ProductService.getProductByCode(code);

    // Render the 'card' Pug template with a title and the product details
    res.status(200).render('card', {
      title: `Товар - ${product.title}`, // Title of the product details page, including the product title
      product, // Pass the product object to the template for rendering
    });
  });

  // Method to render the info page with no additional parameters
  renderInfo = catchAsync(async (req, res) => {
    res.status(200).render('info', {
      title: 'Prologix - Информация', // Optional title for the page
    });
  });

  // Method to render the info page with no additional parameters
  renderAbout = catchAsync(async (req, res) => {
    res.status(200).render('about', {
      title: 'Prologix - Про нас', // Optional title for the page
    });
  });

  // Method to render the components page with no additional parameters
  renderComponents = catchAsync(async (req, res) => {
    res.status(200).render('components', {
      title: 'Prologix - Компоненти', // Optional title for the page
    });
  });

  // Method to render the authorization page with no additional parameters
  renderAuthorization = catchAsync(async (req, res) => {
    res.status(200).render('authorization', {
      title: 'Prologix - authorization' // Optional title for the page
    })
  })

  // Method to render the registration page with no additional parameters
  renderRegistration = catchAsync(async (req, res) => {
    res.status(200).render('registration', {
      title: 'Prologix - registration' // Optional title for the page
    })
  })

  // Method to render the profile page with no additional parameters
  renderProfile = catchAsync(async (req, res) => {
    res.status(200).render('profile', {
      title: 'Prologix - profile' // Optional title for the page
    })
  })
}

module.exports = new ViewsController();
