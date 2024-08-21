/* implementing tab functionality on a card page */
const panels = document.querySelectorAll(".panel");
const links = document.querySelectorAll(".tabs a");

for(let elem of links) {
  elem.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector('.panel.active').classList.remove("active");
    document.querySelector('.tabs li.active').classList.remove("active");

    const parentLI = elem.parentElement;
    parentLI.classList.add("active");
    const index = [...parentLI.parentElement.children].indexOf(parentLI);
    const panel = [...panels].filter(elem => elem.getAttribute("data-index") == index);
    panel[0].classList.add("active");
  });
}

/* implementing slideshow functionality on a card page */

var index = 1;
show(index);

function setCurrent(n) {
    show(index = n);
}

function swipe(n) {
  show(index += n);
}

function show(n) {
  var i;
  var images = document.getElementsByClassName("thumbnail");
  var slides = document.getElementsByClassName("slide");

  if (n < 1) {
    index = slides.length;
  }
  if (n > slides.length) {
    index = 1;
  }
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace(" active", "");
  }
  images[index-1].className += " active";
  slides[index-1].style.marginTop = "40px";
  slides[index-1].style.display = "block";
}