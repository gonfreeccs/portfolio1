// MENU TOGGLE
const toggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('navLinks');

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
}


// HERO IMAGE (RIGHT-ONLY SMOOTH)
const hero = document.getElementById('hero');
const image = document.querySelector('.hero-bottom .col:nth-child(2) img');

let currentX = 0;
let targetX = 0;

if (hero && image) {
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const centerX = rect.width / 2;

    // smoother + controlled movement
    targetX = Math.max(0, ((x - centerX) / centerX) * 40);
  });

  hero.addEventListener('mouseleave', () => {
    targetX = 0;
  });
}


// LOGO SCROLL
const logoSection = document.querySelector('.logo-scroll');
const row1 = document.querySelector('.row1 .scroll-track');
const row2 = document.querySelector('.row2 .scroll-track');


// HEADINGS
const headings = document.querySelectorAll(
  '.h-about, .h-services, .h-projects, .h-testimonials'
);


// MAIN ANIMATION LOOP (ONE LOOP ONLY)
function animate() {

  // --- HERO IMAGE SMOOTH MOVE ---
  if (image) {
    currentX += (targetX - currentX) * 0.08; // smoother easing
    image.style.transform = `translate3d(${currentX}px, 0, 0)`;
  }

  // --- LOGO SCROLL (FIXED + SMOOTHER) ---
if (logoSection && row1 && row2) {
  const rect = logoSection.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  let progress = (windowHeight - rect.top) / (windowHeight + rect.height);

  progress = Math.max(0, Math.min(progress, 1));
  progress = progress * progress * (3 - 2 * progress);

  const moveAmount = 600;

  // row1 ← left
  row1.style.transform = `translate3d(${-moveAmount * progress}px, 0, 0)`;

  // row2 ← ALSO left (same behavior)
  row2.style.transform = `translate3d(${-moveAmount * progress * 0.7}px, 0, 0)`;
}

  // --- HEADINGS SCROLL ANIMATION ---
  if (headings.length) {
    const windowHeight = window.innerHeight;

    headings.forEach(el => {
      const rect = el.getBoundingClientRect();

      const start = windowHeight * 0.45;
      const end = windowHeight * 0.15;

      let progress = (start - rect.top) / (start - end);

      // clamp
      progress = Math.max(0, Math.min(progress, 1));

      // smoother easing
      progress = progress * progress * (3 - 2 * progress);

      // fill → stroke transition (cleaner)
      const stroke = 2 - (1.8 * progress);
      const opacity = progress;

      if (el.classList.contains('h-services')) {
        el.style.webkitTextStroke = `${stroke}px #000`;
        el.style.color = `rgba(0,0,0,${opacity})`;
      } else {
        el.style.webkitTextStroke = `${stroke}px #fff`;
        el.style.color = `rgba(255,255,255,${opacity})`;
      }
    });
  }

  requestAnimationFrame(animate);
}


// START LOOP
animate();

// PROJECTS SLIDER
const projectSlides = Array.from(document.querySelectorAll('.project-slide'));
const sliderDots = Array.from(document.querySelectorAll('.slider-dot'));
const prevButton = document.querySelector('.slider-btn.prev');
const nextButton = document.querySelector('.slider-btn.next');
let currentSlide = 0;
let sliderTimer;

function showSlide(index) {
  if (!projectSlides.length) return;

  currentSlide = (index + projectSlides.length) % projectSlides.length;

  projectSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle('active', slideIndex === currentSlide);
  });

  sliderDots.forEach((dot, dotIndex) => {
    dot.classList.toggle('active', dotIndex === currentSlide);
  });
}

function startSlider() {
  clearInterval(sliderTimer);
  sliderTimer = setInterval(() => {
    showSlide(currentSlide + 1);
  }, 5000);
}

if (projectSlides.length) {
  showSlide(0);

  prevButton?.addEventListener('click', () => {
    showSlide(currentSlide - 1);
    startSlider();
  });

  nextButton?.addEventListener('click', () => {
    showSlide(currentSlide + 1);
    startSlider();
  });

  sliderDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      startSlider();
    });
  });

  const sliderContainer = document.querySelector('.projects-slider');
  sliderContainer?.addEventListener('mouseenter', () => clearInterval(sliderTimer));
  sliderContainer?.addEventListener('mouseleave', startSlider);

  startSlider();
}