// Author: Yana Levchenko, Anna Geenko

document.addEventListener('DOMContentLoaded', function () {
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
    textForMobile: document.querySelectorAll('.mobile-menu a'),
    li: document.querySelectorAll('li'),
    personalButton: document.querySelectorAll('.tab-button'),
    nameHeaderAbout: document.querySelector('#name'),
    backgroundAbout: document.querySelector('#background'),
    roleAbout: document.querySelectorAll('.role p'),
  };

  // Function to apply the theme
  function applyTheme(isLightMode) {
    elementsToToggle.body.classList.toggle('light', isLightMode);
    elementsToToggle.header.classList.toggle('light', isLightMode);
    elementsToToggle.footer.classList.toggle('light', isLightMode);
    elementsToToggle.logo.src = isLightMode ? './img/logo-black.png' : './img/logo.png';
    elementsToToggle.links.forEach((link) => link.classList.toggle('light', isLightMode));
    elementsToToggle.text.forEach((p) => p.classList.toggle('light', isLightMode));
    elementsToToggle.icons.forEach((icon) => icon.classList.toggle('light', isLightMode));
    elementsToToggle.filterButtons.forEach((button) => button.classList.toggle('light', isLightMode));
    elementsToToggle.imgTitle.forEach((title) => title.classList.toggle('light', isLightMode));
    elementsToToggle.scroll.classList.toggle('light', isLightMode);
    elementsToToggle.mobileMenu.classList.toggle('light', isLightMode);
    elementsToToggle.textForMobile.forEach((text) => text.classList.toggle('light', isLightMode));
    elementsToToggle.li.forEach((li) => li.classList.toggle('light', isLightMode));
    for (const [key, value] of Object.entries(elementsToToggle)) {
      console.log(key, value);
    }

    // Checking whether the user is on the home page
    const url = window.location.href;
    const containsIndexHtml = url.includes('overviews.html');
    const containsComponentsHtml = url.includes('components.html');
    const containsCabinetHtml = url.includes('cabinet.html');
    const containsAboutHtml = url.includes('about.html');
    if (containsIndexHtml) {
      elementsToToggle.filters.classList.toggle('light', isLightMode);
      elementsToToggle.categories.classList.toggle('light', isLightMode);
      elementsToToggle.listImg.classList.toggle('light', isLightMode);
    } else if (containsAboutHtml) {
      elementsToToggle.personalButton.forEach((button) => button
          .classList.toggle('light', isLightMode));
      elementsToToggle.nameHeaderAbout.classList.toggle('light', isLightMode);
      elementsToToggle.backgroundAbout.classList.toggle('light', isLightMode);
      elementsToToggle.roleAbout.forEach((role) => role.classList.toggle('light', isLightMode));
    } else if (containsComponentsHtml) {
      elementsToToggle.filters.classList.toggle('light', isLightMode);
      elementsToToggle.categories.classList.toggle('light', isLightMode);
      elementsToToggle.listImg.classList.toggle('light', isLightMode);
    } else if (containsCabinetHtml) {
      elementsToToggle.filters.classList.toggle('light', isLightMode);
      elementsToToggle.categories.classList.toggle('light', isLightMode);
      elementsToToggle.listImg.classList.toggle('light', isLightMode);
    }
  }

  // Load theme from localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    const isLightMode = savedTheme === 'light';
    switchTheme.checked = isLightMode;
    applyTheme(isLightMode);
  }

  // Switch theme functionality
  switchTheme.addEventListener('change', function () {
    console.log('Theme switch triggered');
    const isLightMode = this.checked;
    applyTheme(isLightMode);
    localStorage.setItem('theme', isLightMode ? 'light' : 'default');
  });


  // Mobile menu functionality
  const mobileMenuIcon = document.getElementById('mobile-menu-icon');
  const mobileMenu = document.getElementById('mobile-menu');

  mobileMenuIcon.addEventListener('click', function () {
    if (mobileMenu.classList.contains('show')) {
      mobileMenu.classList.remove('show');
      mobileMenu.classList.add('hide');
    } else {
      mobileMenu.style.display = 'block';
      mobileMenu.classList.remove('hide');
      mobileMenu.classList.add('show');
    }
  });

  document.addEventListener('click', function (event) {
    if (
        !mobileMenu.contains(event.target) &&
        !mobileMenuIcon.contains(event.target)
    ) {
      mobileMenu.classList.remove('show');
      mobileMenu.classList.add('hide');
    }
  });

  // Close mobile menu when animation ends
  mobileMenu.addEventListener('animationend', function (event) {
    if (event.animationName === 'slideUp') {
      mobileMenu.style.display = 'none';
    }
  });
});

// Scroll-to-top button functionality
const scrollToTopButton = document.getElementById('scroll-to-top');

// Show or hide scroll-to-top button based on scroll position
window.addEventListener('scroll', function () {
  if (window.scrollY > 300) {
    scrollToTopButton.classList.add('show');
  } else {
    scrollToTopButton.classList.remove('show');
  }
});

scrollToTopButton.addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});