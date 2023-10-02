//VARIABLES
const menuButton = document.querySelector(".menu-button");
const overlay = document.querySelector(".hidden-overlay");
const navCloseBtn = document.querySelector(".nav-close");
const ulWrapper = document.querySelector(".ul-wrapper");
const categories = document.querySelector(".categories");

//SIDEBAR FUNCTIONS
const sidebar = {
  oneTimeReminder: document.querySelector(".one-time-reminder"),
  // categories: document.querySelector(".categories"),
  nav: document.querySelector("nav"),
  transition: "transition",

  toggleElementClass() {
    ulWrapper.classList.add(this.transition);
    categories.classList.add(this.transition);
    overlay.classList.add(this.transition);
  },

  onTransitionEnd() {
    ulWrapper.addEventListener("transitionend", () => {
      ulWrapper.classList.remove(this.transition);
    });
    categories.addEventListener("transitionend", () => {
      categories.classList.remove(this.transition);
    });
    overlay.addEventListener("transitionend", () => {
      overlay.classList.remove(this.transition);
    });
  },

  show() {
    this.toggleElementClass();
    ulWrapper.style.transform = "translateX(-75vw)";
    overlay.style.opacity = "1";
    categories.style.transform = "translateX(0px)";
    overlay.style.zIndex = "1";
    this.onTransitionEnd();
  },

  hide() {
    this.toggleElementClass();
    ulWrapper.style.transform = "none";
    overlay.style.opacity = "0";
    categories.style.transform = "translateX(50px)";
    this.oneTimeReminder.style.opacity = "0";
    overlay.style.zIndex = "-1";
    this.onTransitionEnd();
  },
};

//SHOW AND HIDE SIDEBAR WHEN CLICKED MENU BUTTON
//AND HIDES THE SIDEBAR WHEN CLICKED THE MAIN ELEMENTS
const elements = [menuButton, overlay, navCloseBtn];

for (let element of elements) {
  element.addEventListener("click", () => {
    requestAnimationFrame(() => {
      const ulWrapperTransform = window.getComputedStyle(ulWrapper).transform;
      ulWrapperTransform === "none" ? sidebar.show() : sidebar.hide();
    });
  });
}

//SHOW AND HIDE HEADER WHEN SCROLL TRIGGERED IN Y AXIS;
let prevScrollY = scrollY;

window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  let currentScrollY = scrollY;

  if (window.innerWidth < 992) {
    if (currentScrollY > prevScrollY) {
      setTimeout(() => {
        header.classList.add("hide-header");
        header.classList.remove("header-back-transition");
      }, 500);
    } else {
      setTimeout(() => {
        header.classList.remove("hide-header");
        header.classList.add("header-back-transition");
      }, 500);
    }
    prevScrollY = currentScrollY;
  }
});

//TO ADD AN INDICATOR TO MENU ON WHICH PAGE IS CURRENTLY ON DISPLAY.
function getCurrent_href() {
  const currentLink = window.location.href;
  const firstIndexOfLastWord = currentLink.lastIndexOf("/") + 1;
  const lastWord = currentLink.slice(firstIndexOfLastWord);
  return document.querySelector(`.${lastWord}`);
}

const currentPage = "currentPage";
(function addClassName() {
  if (window.innerWidth < 992) {
    getCurrent_href().classList.add(currentPage);
  } else {
    getCurrent_href().classList.remove(currentPage);
  }
})();

//WHEN SCREEN SIZE IS TRIGGERED, THE STYLE SHOULD RETURN TO THEIR OWN SETTINGS
const mediaQuery = window.matchMedia("(min-width: 992px)");
const headerInteraction = document.querySelector(".header-interaction");
mediaQuery.addEventListener("change", (event) => {
  if (event.matches) {
    getCurrent_href().classList.remove(currentPage);
    overlay.style.display = "none";
    headerInteraction.style.opacity = "0";
    ulWrapper.style.transform = "none";
    categories.style.transform = "none";
  } else {
    getCurrent_href().classList.add(currentPage);
    overlay.style.cssText = "display: block; z-index: -1; opacity: 0;";
    headerInteraction.style.opacity = "1";
  }
});

//BOX SHADOW OF HEADER SHOW UP WHEN USER START SCROLLING
window.addEventListener("scroll", () => {
  if (window.scrollY > 20 && window.innerWidth >= 992) {
    headerInteraction.style.opacity = "1";
  } else if (window.scrollY < 20 && window.innerWidth >= 992) {
    headerInteraction.style.opacity = "0";
  }
});

//ANIMATION: LOGOS PANNING FROM RIGHT TO LEFT
//implementation of logo wrapper
const logoPlaceholderWrapper = document.querySelector(
  ".logo-placeholder-wrapper"
);
let width_Of_logoPlaceholderWrapper =
  getComputedStyle(logoPlaceholderWrapper).width.split("px")[0] * 1;
let translateX =
  getComputedStyle(logoPlaceholderWrapper).transform.split(",")[4] * 1;
const copyOf_logoPlaceholderWrapper = logoPlaceholderWrapper.cloneNode(true);
copyOf_logoPlaceholderWrapper.classList.add("clone-logo-wrapper");
const logoContainer = document.querySelector(".logo-container-skills");
logoContainer.appendChild(copyOf_logoPlaceholderWrapper);

//implementation of clone logo wrapper
const cloneLogoWrapper = document.querySelector(".clone-logo-wrapper");
let clone_translateX = width_Of_logoPlaceholderWrapper;
let browserWidth = innerWidth < 768 ? innerWidth * 0.1 : innerWidth * 0.16;
let innerWidth_with10percntDiff = innerWidth - browserWidth;

//when screensize is stretched, the logos will aline to the innerWidth after the last animation
window.addEventListener("resize", () => {
  width_Of_logoPlaceholderWrapper =
    getComputedStyle(logoPlaceholderWrapper).width.split("px")[0] * 1;
  translateX = 0;
  browserWidth = innerWidth < 768 ? innerWidth * 0.1 : innerWidth * 0.16;
  innerWidth_with10percntDiff = innerWidth - browserWidth;
  clone_translateX = width_Of_logoPlaceholderWrapper;
});

//function for the panning annimation with requestFrameAnimation
function panLeft() {
  if (translateX > -innerWidth_with10percntDiff) {
    translateX--;
    clone_translateX--;

    if (clone_translateX <= -innerWidth_with10percntDiff) {
      clone_translateX = width_Of_logoPlaceholderWrapper;
    } else {
      logoPlaceholderWrapper.style.transform = `translateX(${translateX}px)`;
      cloneLogoWrapper.style.transform = `translateX(${clone_translateX}px)`;
    }

    requestAnimationFrame(panLeft);
  } else {
    translateX = innerWidth_with10percntDiff;
    clone_translateX = 0;
    requestAnimationFrame(panLeft);
  }
}
requestAnimationFrame(panLeft);

//INTERSECTION OBERSERVER
const options = {
  rootMargin: "100%",
  threshold: 0.01,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.background =
        'url("/img/contact-details-background1.jpg") no-repeat content-box center';
      observer.unobserve(entry.target);
    }
  });
}, options);

const target = document.querySelector(".contact-details-section");
observer.observe(target);
