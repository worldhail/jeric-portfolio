//VARIABLES
const menuButton = document.querySelector(".menu-button");
const overlay = document.querySelector(".hidden-overlay");
const navCloseBtn = document.querySelector(".nav-close");
const ulWrapper = document.querySelector(".ul-wrapper");

//SIDEBAR FUNCTIONS
const sidebar = {
  oneTimeReminder: document.querySelector(".one-time-reminder"),
  categories: document.querySelector(".categories"),
  nav: document.querySelector("nav"),
  transition: "transition",

  toggleElementClass() {
    ulWrapper.classList.add(this.transition);
    this.categories.classList.add(this.transition);
    overlay.classList.add(this.transition);
  },

  onTransitionEnd() {
    ulWrapper.addEventListener("transitionend", () => {
      ulWrapper.classList.remove(this.transition);
    });
    this.categories.addEventListener("transitionend", () => {
      this.categories.classList.remove(this.transition);
    });
    overlay.addEventListener("transitionend", () => {
      overlay.classList.remove(this.transition);
    });
  },

  show() {
    this.toggleElementClass();
    ulWrapper.style.transform = "translateX(-75vw)";
    overlay.style.opacity = "1";
    this.categories.style.transform = "translateX(0px)";
    overlay.style.zIndex = "1";
    this.onTransitionEnd();
  },

  hide() {
    this.toggleElementClass();
    ulWrapper.style.transform = "none";
    overlay.style.opacity = "0";
    this.categories.style.transform = "translateX(50px)";
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

window.addEventListener(
  "scroll",
  (hideHeader = () => {
    const header = document.querySelector("header");
    let currentScrollY = scrollY;

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
  })
);

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

//BOX SHADOW OF HEADER SHOW UP WHEN USER START SCROLLING
window.addEventListener("scroll", () => {
  if (window.scrollY > 20 && window.innerWidth >= 992) {
    headerInteraction.style.opacity = "1";
  } else if (window.scrollY < 20 && window.innerWidth >= 992) {
    headerInteraction.style.opacity = "0";
  }
});

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
