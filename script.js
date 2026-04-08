
// ── LOADER ──
window.addEventListener('load', () => {
  setTimeout(() => { document.getElementById('loader').classList.add('hide'); }, 1900);
});

// ── CUSTOM CURSOR ──
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function animateCursor() {
  dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  rx += (mx - rx) * 0.13; ry += (my - ry) * 0.13;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => { ring.style.width = '56px'; ring.style.height = '56px'; dot.style.opacity = '0'; });
  el.addEventListener('mouseleave', () => { ring.style.width = '34px'; ring.style.height = '34px'; dot.style.opacity = '1'; });
});

// ── NAVBAR SCROLL ──
window.addEventListener('scroll', () => {
  document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 60);
});

// ── HERO SLIDER ──
let current = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.hero-dot');
function goSlide(n) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (n + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
}
setInterval(() => goSlide(current + 1), 5000);

// ── 3D TILT ON ABOUT IMAGE ──
const tilt = document.getElementById('tiltCard');
if (tilt) {
  tilt.addEventListener('mousemove', e => {
    const r = tilt.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
    const y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    tilt.style.transform = `perspective(1200px) rotateY(${x * 9}deg) rotateX(${-y * 9}deg) scale(1.02)`;
  });
  tilt.addEventListener('mouseleave', () => { tilt.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) scale(1)'; });
}

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
reveals.forEach(el => io.observe(el));

// ── COUNTER ANIMATION ──
const counters = document.querySelectorAll('.stat-num');
const cio = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target, target = +el.dataset.target;
    let count = 0;
    const step = Math.ceil(target / 60);
    const t = setInterval(() => {
      count = Math.min(count + step, target);
      el.textContent = count.toLocaleString();
      if (count >= target) clearInterval(t);
    }, 28);
    cio.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(c => cio.observe(c));

// ── TESTIMONIALS ──
const testimonials = [
  { text: '"The Tulip Touch Café is an absolute gem in Vadodara. The cappuccino was perfect, the ambience warm and inviting — felt like home instantly."', name: '— Priya Sharma, Vadodara' },
  { text: '"Best cold brew in the city, hands down. And the waffles? Absolutely divine. This café is my weekend ritual now."', name: '— Rohan Mehta, Vadodara' },
  { text: '"Came for a quick coffee, stayed for two hours. The food is delicious and the vibe is just unmatched. Highly recommend!"', name: '— Ananya Patel, Vadodara' },
  { text: '"The Alfredo pasta and the sandwich are must-tries. Beautiful décor, quick service, and warm staff. Will definitely come back."', name: '— Karan Joshi, Baroda' },
  { text: '"A cozy little corner of happiness. Great for dates, catch-ups, or just peaceful solo time. Loved every single bite."', name: '— Sneha Desai, Vadodara' },
];
let ct = 0;
const tCard = document.getElementById('testiCard');
const tText = document.getElementById('testiText');
const tName = document.getElementById('testiName');
const tDotsEl = document.getElementById('testiDots');
testimonials.forEach((_, i) => {
  const d = document.createElement('div');
  d.className = 'testi-dot' + (i === 0 ? ' active' : '');
  d.onclick = () => changeTesti(i);
  tDotsEl.appendChild(d);
});
function changeTesti(n) {
  tCard.classList.add('flip-out');
  setTimeout(() => {
    ct = n;
    tText.textContent = testimonials[ct].text;
    tName.textContent = testimonials[ct].name;
    document.querySelectorAll('.testi-dot').forEach((d, i) => d.classList.toggle('active', i === ct));
    tCard.classList.remove('flip-out');
    tCard.classList.add('flip-in');
    requestAnimationFrame(() => requestAnimationFrame(() => { tCard.classList.remove('flip-in'); tCard.classList.add('active'); }));
  }, 350);
}
setInterval(() => changeTesti((ct + 1) % testimonials.length), 4500);

// ── LIGHTBOX ──
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
function openLightbox(el) {
  lbImg.src = el.querySelector('img').src;
  lb.classList.add('open');
}
document.getElementById('lightbox-close').onclick = () => lb.classList.remove('open');
lb.addEventListener('click', e => { if (e.target === lb) lb.classList.remove('open'); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') lb.classList.remove('open'); });


