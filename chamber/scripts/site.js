// site.js - site-wide UI behaviors previously inline in index.html
document.addEventListener('DOMContentLoaded', () => {
  // Set current year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Set last modified date
  const lastModEl = document.getElementById('last-modified');
  if (lastModEl) lastModEl.textContent = document.lastModified;

  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // Set current date (readable format)
  const currentDateEl = document.getElementById('current-date');
  if (currentDateEl) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date().toLocaleDateString('en-US', options);
    currentDateEl.textContent = today;
  }
});
