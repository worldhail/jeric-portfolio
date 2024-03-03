//BOTTOM CONTACT DETAILS FOR HOME PAGE: INTERSECTION OBSERVER
const options = {
    rootMargin: "100%",
    threshold: 0.01,
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.background =
          'url("img/contact-details-background1.jpg") center';
        observer.unobserve(entry.target);
      }
    });
  }, options);
  
  const target = document.querySelector(".contact-details-section");
  observer.observe(target);