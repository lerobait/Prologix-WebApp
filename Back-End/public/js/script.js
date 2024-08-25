// Author: Anna Geenko, Yana Levchenko, Artem Nikulin

// Function to update the height of the filters section based on the active filters
function updateFiltersHeight(filterButton, filtersSection) {
  const activeFilterList = document.querySelector('.filter-list.show');
  const activeSubFilterLists = activeFilterList
      ? activeFilterList.querySelectorAll('.sub-filter-list.show')
      : [];
  let totalHeight = filterButton.scrollHeight + 89;

  // Check if the device is mobile
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    totalHeight -= 20;
  }

  if (activeFilterList) {
      const filterButtons = activeFilterList
          .querySelectorAll('.sub-filter-button');

      filterButtons.forEach(button => {
          totalHeight += button.scrollHeight;
      });
  }

  if (activeSubFilterLists.length > 0) {
      activeSubFilterLists.forEach(subFilterList => {
          totalHeight += subFilterList.scrollHeight;
      });
  }

  if (!activeFilterList && activeSubFilterLists.length === 0) {
      totalHeight = filterButton.scrollHeight + (isMobile ? 20 : 40);
  }

  filtersSection.style.height = `${totalHeight}px`;
 }

    // Filter functionality
    const filterButton = document.querySelector('.filter-button');
    const filtersSection = document.querySelector('#filters');
    const filterList = filterButton.nextElementSibling;

    filterButton.addEventListener('click', function() {
        const isActive = this.classList.contains('active');

        document.querySelectorAll('.filter-list').forEach(list => {
            list.classList.remove('show');
            list.classList.add('hide');
        });

        document.querySelectorAll('.filter-button').forEach(btn => {
            btn.classList.remove('active');
        });

        if (!isActive) {
            filterList.style.display = 'block';
            filterList.classList.remove('hide');
            filterList.classList.add('show');
            this.classList.add('active');
        } else {
            filterList.classList.remove('show');
            filterList.classList.add('hide');
        }

        updateFiltersHeight(filterButton, filtersSection);
    });

    // Close filter list when animation ends
    filterList.addEventListener('animationend', function(event) {
        if (event.animationName === 'slideBottomUp' && !filterList.classList.contains('show')) {
            filterList.style.display = 'none';
        }
    });

    // Sub-filter functionality
    document.querySelectorAll('.sub-filter-button').forEach(button => {
        button.addEventListener('click', function() {
            const subFilterList = this.nextElementSibling;
            const isActive = this.classList.contains('active');

            if (!isActive) {
                subFilterList.style.display = 'block';
                subFilterList.classList.remove('hide');
                subFilterList.classList.add('show');
                this.classList.add('active');
            } else {
                subFilterList.classList.remove('show');
                subFilterList.classList.add('hide');
                this.classList.remove('active');
            }

            updateFiltersHeight(filterButton, filtersSection);
        });
    });

    document.querySelectorAll('.sub-filter-list').forEach(subFilterList => {
        subFilterList.addEventListener('animationend', function(event) {
            if (event.animationName === 'slideBottomUp' && !filterList.classList.contains('hide')) {
                subFilterList.style.display = 'none';
            }
        });
    });

    // Image navigation functionality
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const listImages = document.getElementById('list-images');
    const images = listImages.querySelectorAll('a');
    const imagesPerPage = 4;
    let currentIndex = 0;

    function updateButtons() {
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= images.length - imagesPerPage;
    }

    // Scroll images to the current index
    function scrollImages() {
        const imgWidth = images[0].offsetWidth;
        listImages.scrollTo({
            left: currentIndex * imgWidth,
            behavior: 'smooth'
        });
    }

    prevButton.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            scrollImages();
            updateButtons();
        }
    });

    nextButton.addEventListener('click', function() {
        if (currentIndex < images.length - imagesPerPage) {
            currentIndex++;
            scrollImages();
            updateButtons();
        }
    });

    updateButtons();

    // Scroll-to-top button functionality
    const scrollToTopButton = document.getElementById('scroll-to-top');

    // Show or hide scroll-to-top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopButton.classList.add('show');
        } else {
            scrollToTopButton.classList.remove('show');
        }
    });

    scrollToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Mobile menu functionality
    const mobileMenuIcon = document.getElementById('mobile-menu-icon');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuIcon.addEventListener('click', function() {
        if (mobileMenu.classList.contains('show')) {
            mobileMenu.classList.remove('show');
            mobileMenu.classList.add('hide');
        } else {
            mobileMenu.style.display = 'block';
            mobileMenu.classList.remove('hide');
            mobileMenu.classList.add('show');
        }
    });

    document.addEventListener('click', function(event) {
        if (!mobileMenu.contains(event.target) && !mobileMenuIcon.contains(event.target)) {
            mobileMenu.classList.remove('show');
            mobileMenu.classList.add('hide');
        }
    });

    // Close mobile menu when animation ends
    mobileMenu.addEventListener('animationend', function(event) {
        if (event.animationName === 'slideUp') {
            mobileMenu.style.display = 'none';
        }
    });

// Clickability of the product card on the home page

const cardLinks = document.querySelectorAll('.card-link');

cardLinks.forEach((link) => {
  link.addEventListener('click', () => {
    window.location.href = 'card.html';
  });
});

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuIcon = document.getElementById('mobile-menu-icon');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuIcon.addEventListener('click', function() {
        if (mobileMenu.style.display === 'block') {
            mobileMenu.style.display = 'none';
        } else {
            mobileMenu.style.display = 'block';
        }
    });
    addProductCardEventListeners();
  } else {
    // Log an error if the grid container is not found in the current document
    console.error('No .grid-container found in the current document');
  }

  // Update pagination
  const paginationContainer = doc.querySelector('.pagination-container');
  const pagination = document.querySelector('.pagination-container');
  if (paginationContainer) {
    if (pagination) {
      // Update the existing pagination with new content
      pagination.innerHTML = paginationContainer.innerHTML;
    } else {
      // If pagination container is not present in the current document, add it
      const newPagination = document.createElement('div');
      newPagination.classList.add('pagination-container');
      newPagination.innerHTML = paginationContainer.innerHTML;
      // Append the new pagination container to the grid container or another appropriate element
      const element = document.querySelector('.grid-container');
      element.appendChild(newPagination);
    }
  } else {
    // Log an error if the pagination container is not found in the response HTML
    console.error('No .pagination-container found in the response HTML');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Handle category button clicks
  const categoryButtons = document.querySelectorAll('.category-button');
  // Iterate over each category button
  categoryButtons.forEach((button) => {
    // Add a click event listener to each button
    button.addEventListener('click', async (event) => {
      // Prevent the default action of the click event (e.g., navigating to a link)
      event.preventDefault();
      // Get the category ID from the button's data attribute
      const categoryId = event.currentTarget.getAttribute('data-category-id');
      const url = `/?categories=${categoryId}&page=1&limit=15`;
      try {
        // Make an asynchronous request to the server to fetch products for the selected category
        const response = await fetch(url);
        // Get the response text, which is expected to be HTML content
        const html = await response.text();
        // Update the product cards with the new HTML content
        updatePageContent(html);
        // Update the browser's history to reflect the new URL
        history.pushState(null, '', url);
      } catch (error) {
        // Log any errors that occur during the fetch operation
        console.error('Error fetching product data:', error);
      }
    });
  });

  // Handle search button click
  const searchInput = document.querySelector('#search-container input#search');
  const searchButton = document.querySelector(
      '#search-container span._icon-search'
  );

  // Add an event listener to the search button to handle click events
  searchButton.addEventListener('click', async () => {
    const searchQuery = searchInput.value.trim();
    // Construct the URL for the search request, including query parameters for the search term and pagination
    const url = `/products/search?search=${encodeURIComponent(
        searchQuery
    )}&page=1&limit=15`;
    try {
      // Fetch the search results from the server
      const response = await fetch(url);
      // Convert the response to text (HTML) format
      const html = await response.text();
      // Update the page content with the new HTML data
      updatePageContent(html);
      // Update the browser's history to reflect the new URL
      history.pushState(null, '', url);
    } catch (error) {
      // Log any errors that occur during the fetch operation
      console.error('Error fetching product data:', error);
    }
  });

  // Handle pressing Enter in the search input
  searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      searchButton.click();
    }
  });

  addProductCardEventListeners();
});
