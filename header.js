/**
 * STRANZ LOGISTICS HEADER ENGINE
 */
fetch('header.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('header').innerHTML = data;

    // Highlight active link
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll('.sz-nav-list a');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      // Reset active class
      link.classList.remove('active');
      
      if (href === currentPage) {
        link.classList.add('active');
      }
    });
  })
  .catch(err => console.error('Header Load Failure:', err));