export const getCurrent_href = () => {
    let currentLink = window.location.href;
    const pages = ['index', 'about', 'contact', 'skills', 'project'];
    const page = pages.filter(page => currentLink.includes(page)).join();
  
    return page === '' ? document.querySelector('.index')
    : document.querySelector(`.${page}`);
  }