/* =========================================================
   Next Door Investing — shared site script
   Injects identical header + footer on every page so nav
   stays in sync site-wide. Edit HEADER_HTML / FOOTER_HTML
   here ONCE and every page updates automatically.
   ========================================================= */

(function () {
  // Path back to the site root, so links work whether this
  // page lives at /index.html or /blog/posts/whatever.html
  const ROOT = document.body.getAttribute('data-root') || '';

  const HEADER_HTML = `
  <header>
    <div class="wrap nav">
      <a class="nav-logo" href="${ROOT}index.html">
        <img src="${ROOT}assets/logo-mark.png" alt="Next Door Investing — arched door with mountain view logo">
        <span>Next Door Investing</span>
      </a>
      <nav aria-label="Main">
        <ul class="nav-links" id="navLinks">
          <li><a href="${ROOT}index.html" data-key="home">Home</a></li>
          <li><a href="${ROOT}about.html" data-key="about">About</a></li>
          <li><a href="${ROOT}blog/index.html" data-key="blog">Blog</a></li>
          <li><a href="${ROOT}calculators.html" data-key="calculators">Calculators</a></li>
          <li><a href="${ROOT}faq.html" data-key="faq">FAQ</a></li>
          <li><a href="${ROOT}contact.html" data-key="contact">Contact</a></li>
          <li><a class="btn btn-gold nav-cta" href="${ROOT}contact.html" data-key="contact">Contact Christian</a></li>
        </ul>
      </nav>
      <button class="hamburger" id="burger" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
    </div>
  </header>`;

  const FOOTER_HTML = `
  <footer>
    <div class="wrap foot-grid">
      <div>
        <img src="${ROOT}assets/logo-mark.png" alt="Next Door Investing logo">
        <p class="foot-tag">Where Home Meets Opportunity.</p>
      </div>
      <div>
        <h4>Explore</h4>
        <ul>
          <li><a href="${ROOT}index.html">Home</a></li>
          <li><a href="${ROOT}about.html">About</a></li>
          <li><a href="${ROOT}blog/index.html">Blog</a></li>
          <li><a href="${ROOT}calculators.html">Calculators</a></li>
          <li><a href="${ROOT}faq.html">FAQ</a></li>
          <li><a href="${ROOT}contact.html">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4>Contact</h4>
        <ul>
          <li><a href="tel:5417718880">(541) 771-8880</a></li>
          <li><a href="mailto:">NextDoorInvesting@gmail.com</a></li>
          <li><a href="https://www.instagram.com/nextdoorinvesting/" target="_blank" rel="noopener">Instagram</a> · <a href="https://www.facebook.com/NextDoorInvesting/" target="_blank" rel="noopener">Facebook</a></li>
          <li style="margin-top:.8rem;font-size:.85rem">Serving Bend, Redmond,<br>Terrebonne & La Pine</li>
        </ul>
      </div>
    </div>
    <div class="wrap foot-bottom">
      <span>Powered By: Realty One Group Discovery</span>
      <span>© 2026 Next Door Investing. All rights reserved.</span>
    </div>
  </footer>`;

  // Inject header at the very top of <body>, footer at the very end
  document.body.insertAdjacentHTML('afterbegin', HEADER_HTML);
  document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);

  // Highlight current page in nav using data-key + data-page on <body>
  const current = document.body.getAttribute('data-page');
  if (current) {
    document.querySelectorAll('.nav-links a[data-key]').forEach(a => {
      if (a.dataset.key === current && !a.classList.contains('btn')) {
        a.classList.add('active');
      }
    });
  }

  // Hamburger menu toggle
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      burger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });
    // Close mobile menu after any nav click
    navLinks.addEventListener('click', e => {
      if (e.target.tagName === 'A') navLinks.classList.remove('open');
    });
  }
})();
