document.addEventListener('DOMContentLoaded', function() {
    // Function to update the height of the filters section based on the active filters
    function updateFiltersHeight(filterButton, filtersSection) {
        const activeFilterList = document.querySelector('.filter-list.show');
        const activeSubFilterLists = activeFilterList ? activeFilterList.querySelectorAll('.sub-filter-list.show') : [];
        let totalHeight = filterButton.scrollHeight + (activeFilterList ? activeFilterList.scrollHeight : 0);

        activeSubFilterLists.forEach(subFilterList => {
            totalHeight += subFilterList.scrollHeight;
        });

        filtersSection.style.height = `${totalHeight + 40}px`;
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
            filterList.style.display = 'block'; // Ensure display is set to block
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
        if (event.animationName === 'slideBottomUp') {
            filterList.style.display = 'none';
        }
    });

    // Sub-filter functionality
    document.querySelectorAll('.sub-filter-button').forEach(button => {
        button.addEventListener('click', function() {
            const subFilterList = this.nextElementSibling;
            const isActive = this.classList.contains('active');

            if (!isActive) {
                subFilterList.style.display = 'block'; // Ensure display is set to block
                subFilterList.classList.remove('hide');
                subFilterList.classList.add('show');
                this.classList.add('active');
            } else {
                subFilterList.classList.remove('show');
                subFilterList.classList.add('hide');
                subFilterList.style.display = 'none';
                this.classList.remove('active');
            }

            updateFiltersHeight(filterButton, filtersSection);
        });
    });

    // Close sub-filter list when animation ends
    document.querySelectorAll('.sub-filter-list').forEach(subFilterList => {
        subFilterList.addEventListener('animationend', function(event) {
            if (event.animationName === 'slideBottomUp') {
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
});