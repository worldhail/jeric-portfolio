//HEADER VISIBILITY: SHOW AND HIDE HEADER WHEN SCROLL TRIGGERED IN Y AXIS;
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

//BOX SHADOW OF HEADER SHOW UP WHEN USER START SCROLLING
const headerInteraction = document.querySelector(".header-interaction");
window.addEventListener("scroll", () => {
  if (window.scrollY > 20 && window.innerWidth >= 992) {
    headerInteraction.style.opacity = "1";
  } else if (window.scrollY < 20 && window.innerWidth >= 992) {
    headerInteraction.style.opacity = "0";
  }
});

//INDICATOR PAGE DISPLAY: TO ADD AN INDICATOR TO MENU ON WHICH PAGE IS CURRENTLY ON DISPLAY.
import { getCurrent_href } from "./getCurrent_href.js";
const currentPage = "currentPage";

(function addClassName() {
  if (window.innerWidth < 992) {
    getCurrent_href().classList.add(currentPage);
  } else {
    getCurrent_href().classList.remove(currentPage);
  }
})();

//DISPLAY ARRANGER: WHEN SCREEN SIZE IS TRIGGERED, THE STYLE SHOULD RETURN TO THEIR OWN SETTINGS
import { overlay, ulWrapper, categories } from "./variables.js"
const mediaQuery = window.matchMedia("(min-width: 992px)");

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
