// Author: Anna Geenko

document.addEventListener('DOMContentLoaded', function() {
    // Switch theme functionality
    const switchTheme = document.querySelector('.switch input');
    const elementsToToggle = {
        body: document.body,
        header: document.querySelector('header'),
        footer: document.querySelector('footer'),
        logo: document.querySelector('.logo img'),
        links: document.querySelectorAll('a'),
        text: document.querySelectorAll('p'),
        icons: document.querySelectorAll('.icon'),
        filterButtons: document.querySelectorAll('.filter-button, .sub-filter-button'),
        filters: document.querySelector('#filters'),
        categories: document.querySelector('#categories'),
        imgTitle: document.querySelectorAll('.img-title'),
        listImg: document.querySelector('#list-images'),
        scroll: document.querySelector('#scroll-to-top'),
        mobileMenu: document.querySelector('.mobile-menu'),
        textForMobile: document.querySelectorAll('.mobile-menu a')
    };

    // Check if the user changed the theme preference
    switchTheme.addEventListener('change', function() {
        const isLightMode = this.checked;
        elementsToToggle.body.classList.toggle('light', isLightMode);
        elementsToToggle.header.classList.toggle('light', isLightMode);
        elementsToToggle.footer.classList.toggle('light', isLightMode);
        elementsToToggle.logo.src = isLightMode ? './img/logo-black.png' : './img/logo.png';
        elementsToToggle.links.forEach(link => link.classList
            .toggle('light', isLightMode));
        elementsToToggle.text.forEach(p => p.classList
            .toggle('light', isLightMode));
        elementsToToggle.icons.forEach(icon => icon.classList
            .toggle('light', isLightMode));
        elementsToToggle.filterButtons.forEach(button => button.classList
            .toggle('light', isLightMode));
        elementsToToggle.filters.classList.toggle('light', isLightMode);
        elementsToToggle.categories.classList.toggle('light', isLightMode);
        elementsToToggle.imgTitle.forEach(title => title.classList
            .toggle('light', isLightMode));
        elementsToToggle.listImg.classList.toggle('light', isLightMode);
        elementsToToggle.scroll.classList.toggle('light', isLightMode);
        elementsToToggle.mobileMenu.classList.toggle('light', isLightMode);
        elementsToToggle.textForMobile.forEach(text => text.classList
            .toggle('light', isLightMode));
    });


    // Function to update the height of the filters section based on the active filters
    function updateFiltersHeight(filterButton, filtersSection) {
        const activeFilterList = document.querySelector('.filter-list.show');
        const activeSubFilterLists = activeFilterList ? activeFilterList
            .querySelectorAll('.sub-filter-list.show') : [];
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
});