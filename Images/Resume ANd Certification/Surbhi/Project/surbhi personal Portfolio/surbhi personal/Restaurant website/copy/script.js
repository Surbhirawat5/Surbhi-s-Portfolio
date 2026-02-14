/* Shared JS for all pages
   - Dark/Light toggle with localStorage
   - Scroll reveal (IntersectionObserver)
   - Back-to-top button
   - Reservation form handling (modal)
   - Contact form basic handling
*/

document.addEventListener('DOMContentLoaded', function(){

  /* ---------- THEME TOGGLE ---------- */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');

  function applyTheme(theme){
    if(theme === 'dark'){
      document.body.classList.add('dark');
      if(themeIcon) themeIcon.className = 'bi bi-sun-fill';
    } else {
      document.body.classList.remove('dark');
      if(themeIcon) themeIcon.className = 'bi bi-moon-fill';
    }
    localStorage.setItem('ss_theme', theme);
  }

  // Initialize theme from localStorage
  const savedTheme = localStorage.getItem('ss_theme') || 'light';
  applyTheme(savedTheme);

  if(themeToggle){
    themeToggle.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark');
      applyTheme(isDark ? 'dark' : 'light');
    });
  }

  /* ---------- SCROLL REVEAL (IntersectionObserver) ---------- */
  const reveals = document.querySelectorAll('.reveal');
  const obsOptions = { threshold: 0.12 };
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, obsOptions);
  reveals.forEach(r => revealObserver.observe(r));

  /* ---------- BACK TO TOP ---------- */
  const backBtns = document.querySelectorAll('.back-top, #backToTop');
  function toggleBack(){
    const show = window.scrollY > 400;
    backBtns.forEach(b => { if(b) b.style.display = show ? 'flex' : 'none'; });
  }
  window.addEventListener('scroll', toggleBack);
  toggleBack();
  backBtns.forEach(b => {
    if(!b) return;
    b.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));
  });

  /* ---------- RESERVATION FORM ---------- */
  const reservationForm = document.getElementById('reservationForm');
  if(reservationForm){
    reservationForm.addEventListener('submit', function(e){
      e.preventDefault();

      // Basic client validation (HTML required will suffice usually)
      const name = document.getElementById('rName').value.trim();
      const email = document.getElementById('rEmail').value.trim();
      const phone = document.getElementById('rPhone').value.trim();
      const date = document.getElementById('rDate').value;
      const time = document.getElementById('rTime').value;
      const guests = document.getElementById('rGuests').value;

      if(!name || !email || !phone || !date || !time || !guests){
        alert('Please fill all the fields.');
        return;
      }

      // For demo: show bootstrap modal success
      const reserveModalEl = document.getElementById('reserveModal');
      if(reserveModalEl){
        const bsModal = new bootstrap.Modal(reserveModalEl);
        bsModal.show();
        reservationForm.reset();
      } else {
        alert('Reservation received — thank you!');
        reservationForm.reset();
      }
    });
  }

  /* ---------- CONTACT FORM ---------- */
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      // demo: just reset & show alert
      alert('Message sent! We will reply soon.');
      contactForm.reset();
    });
  }

  /* ---------- Minor: highlight active nav link based on URL ---------- */
  const navLinks = document.querySelectorAll('.navbar .nav-link');
  navLinks.forEach(link => {
    try{
      const href = link.getAttribute('href');
      if(href && location.pathname.endsWith(href) || (href === 'index.html' && location.pathname.endsWith('/'))){
        link.classList.add('active');
      }
    }catch(e){}
  });

});
