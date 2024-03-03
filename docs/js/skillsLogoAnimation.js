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