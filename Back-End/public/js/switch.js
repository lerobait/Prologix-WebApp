// Author: Yana Levchenko, Anna Geenko, Dmytro Volkov

document.addEventListener('DOMContentLoaded', function() {
    const switchTheme = document.querySelector('.switch input');
    if (!switchTheme) return; // Проверка наличия элемента переключения темы

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
        cabinet: document.querySelector('#cabinet'),
        imgTitle: document.querySelectorAll('.img-title'),
        listImg: document.querySelector('#list-images'),
        scroll: document.querySelector('#scroll-to-top'),
        mobileMenu: document.querySelector('.mobile-menu'),
        textForMobile: document.querySelectorAll('.mobile-menu a')
    };

    // Функция для применения темы
    function applyTheme(isLightMode) {
        elementsToToggle.body.classList.toggle('light', isLightMode);
        elementsToToggle.body.classList.toggle('dark', !isLightMode);
        elementsToToggle.header.classList.toggle('light', isLightMode);
        elementsToToggle.footer.classList.toggle('light', isLightMode);
        elementsToToggle.logo.src = isLightMode ? './img/logo-black.png' : './img/logo.png';
        elementsToToggle.links.forEach(link => link.classList.toggle('light', isLightMode));
        elementsToToggle.text.forEach(p => p.classList.toggle('light', isLightMode));
        elementsToToggle.icons.forEach(icon => icon.classList.toggle('light', isLightMode));
        elementsToToggle.filterButtons.forEach(button => button.classList.toggle('light', isLightMode));
        elementsToToggle.imgTitle.forEach(title => title.classList.toggle('light', isLightMode));
        elementsToToggle.scroll.classList.toggle('light', isLightMode);
        elementsToToggle.mobileMenu.classList.toggle('light', isLightMode);
        elementsToToggle.textForMobile.forEach(text => text.classList.toggle('light', isLightMode));

        if (elementsToToggle.filters) {
            elementsToToggle.filters.classList.toggle('light', isLightMode);
        }
        if (elementsToToggle.categories) {
            elementsToToggle.categories.classList.toggle('light', isLightMode);
        }
        if (elementsToToggle.cabinet) {
            elementsToToggle.cabinet.classList.toggle('light', isLightMode);
        }
        if (elementsToToggle.listImg) {
            elementsToToggle.listImg.classList.toggle('light', isLightMode);
        }
    }

    // Проверка сохраненного состояния темы
    const savedTheme = sessionStorage.getItem('theme');
    if (savedTheme) {
        const isLightMode = savedTheme === 'light';
        switchTheme.checked = isLightMode;
        applyTheme(isLightMode);
    } else {
        // Если тема не сохранена, показать содержимое страницы
        document.body.style.visibility = 'visible';
    }

    // Обработчик переключения темы
    switchTheme.addEventListener('change', function() {
        const isLightMode = this.checked;
        sessionStorage.setItem('theme', isLightMode ? 'light' : 'dark');
        applyTheme(isLightMode);
    });
});