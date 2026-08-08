// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
if (burger) {
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Nav background on scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) nav.style.boxShadow = '0 8px 30px -12px rgba(0,0,0,0.6)';
  else nav.style.boxShadow = 'none';
});

// Count-up stats
const counters = document.querySelectorAll('.stat-num');
const animateCounter = (el) => {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1400;
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString();
  };
  requestAnimationFrame(step);
};

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => statObserver.observe(c));

// Fade-in on scroll for cards
const fadeTargets = document.querySelectorAll('.tl-card, .case-card, .review-card, .freelance-card');
fadeTargets.forEach(el => el.classList.add('fade-in'));

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
fadeTargets.forEach(el => fadeObserver.observe(el));

// Only allow one case study open at a time (accordion feel), keep first open by default
const caseCards = document.querySelectorAll('.case-card');
caseCards.forEach(card => {
  card.addEventListener('toggle', () => {
    if (card.open) {
      caseCards.forEach(other => {
        if (other !== card) other.open = false;
      });
    }
  });
});
