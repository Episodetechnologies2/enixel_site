// Main Javascript file for Enixel Digital boilerplate
document.addEventListener('DOMContentLoaded', () => {
  console.log('Enixel boilerplate JavaScript successfully loaded.');

  // Example functionality: Mobile menu toggler
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
      menuToggle.setAttribute('aria-expanded', !expanded);
      navMenu.classList.toggle('open');
    });
  }
});
