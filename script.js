/* ===== Smooth Scroll & Scrollspy ===== */
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    const id = a.getAttribute('href');
    document.querySelector(id)?.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

const sections = [...document.querySelectorAll('main .section')];
const spy = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    const id = '#'+entry.target.id;
    const link = document.querySelector(`.nav-link[href="${id}"]`);
    if(entry.isIntersecting){
      document.querySelectorAll('.nav-link.active').forEach(n=>n.classList.remove('active'));
      link?.classList.add('active');
    }
  });
},{threshold:0.55});
sections.forEach(s=>spy.observe(s));

/* ===== Scroll Progress ===== */
const progress = document.getElementById('scrollProgress');
window.addEventListener('scroll', ()=>{
  const h = document.documentElement;
  const scrolled = (h.scrollTop)/(h.scrollHeight - h.clientHeight) * 100;
  progress.style.width = scrolled + '%';
});

/* ===== Parallax Hero ===== */
const bg = document.querySelector('.hero-bg');
window.addEventListener('scroll', ()=>{
  const y = window.scrollY * 0.25;
  bg.style.transform = `translate3d(0, ${y}px, 0)`;
});

/* ===== Fade on Scroll ===== */
const faders = document.querySelectorAll('.fade');
const obs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('show'); });
},{threshold:0.15});
faders.forEach(el=>obs.observe(el));

/* ===== Toggle Detail Pengalaman ===== */
document.querySelectorAll('.toggle-detail').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const card = btn.closest('.job-card');
    const opened = card.classList.toggle('open');
    btn.textContent = opened ? 'Tutup Detail' : 'Lihat Detail';
  });
});

/* ===== Theme Toggle (Hybrid Premium) ===== */
const themeBtn = document.getElementById('themeToggle');
const setTheme = (mode)=>{
  document.body.classList.toggle('light', mode==='light');
  localStorage.setItem('theme', mode);
};
const stored = localStorage.getItem('theme');
if(stored){ setTheme(stored); } else {
  // default: dark; (bisa auto-detect preferensi OS kalau mau)
}
themeBtn.addEventListener('click', ()=>{
  const now = document.body.classList.contains('light') ? 'dark' : 'light';
  setTheme(now);
});

/* ===== Download PDF Otomatis (html2pdf) ===== */
const pdfBtn = document.getElementById('pdfBtn');
pdfBtn.addEventListener('click', ()=>{
  const element = document.getElementById('cv-content');

  // Buka semua job detail sementara agar masuk ke PDF
  const closed = [];
  document.querySelectorAll('.job-card').forEach(card=>{
    if(!card.classList.contains('open')){
      card.classList.add('open');
      closed.push(card);
    }
  });

  const opt = {
    margin: 0.3,
    filename: 'CV_Wisnu_Kukuh_Bagus_Prasetyo.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).save().then(()=>{
    // Tutup kembali yang tadinya tertutup
    closed.forEach(card=>card.classList.remove('open'));
  });
});
