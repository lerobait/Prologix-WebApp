document.addEventListener('DOMContentLoaded', function() {
    // Filter button functionality
    const filterButton = document.querySelector('.filter-button');
    const filtersSection = document.querySelector('#filters');
    const filterList = filterButton.nextElementSibling;

    filterButton.addEventListener('click', function() {
        const isActive = this.classList.contains('active');

        // Hide all filter lists and remove active class from all buttons
        document.querySelectorAll('.filter-list').forEach(list => {
            list.style.display = 'none';
        });

        document.querySelectorAll('.filter-button').forEach(btn => {
            btn.classList.remove('active');
        });

        // Show the filter list and add active class to the button
        if (!isActive) {
            filterList.style.display = 'block';
            this.classList.add('active');
            filtersSection.style.height = `${filterButton.scrollHeight + filterList.scrollHeight + 60}px`;
        } else {
            filtersSection.style.height = '12%';
        }
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
});