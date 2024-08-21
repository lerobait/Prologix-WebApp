// Author: Yana Levchenko, Anna Geenko 

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
        elementsToToggle.imgTitle.forEach(title => title.classList
            .toggle('light', isLightMode));
        elementsToToggle.scroll.classList.toggle('light', isLightMode);
        elementsToToggle.mobileMenu.classList.toggle('light', isLightMode);
        elementsToToggle.textForMobile.forEach(text => text.classList
            .toggle('light', isLightMode));

        //Checking whether the user is on the home page
        const url = window.location.href;
        const containsIndexHtml = url.includes('index.html');
        if (containsIndexHtml) {
            elementsToToggle.filters.classList.toggle('light', isLightMode);
            elementsToToggle.categories.classList.toggle('light', isLightMode);
            elementsToToggle.listImg.classList.toggle('light', isLightMode);
        }
    });
});