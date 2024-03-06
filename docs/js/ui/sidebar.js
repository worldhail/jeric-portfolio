//VARIABLES
import { overlay, ulWrapper, categories } from "../variables.js"
const menuButton = document.querySelector(".menu-button");
const navCloseBtn = document.querySelector(".nav-close");

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