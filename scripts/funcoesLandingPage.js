// ============================================================
// PROGRESS BAR MOBILE
// ============================================================
window.addEventListener('scroll', () => {
    if (window.innerWidth > 768) return;
    const bar = document.getElementById('progress-bar');
    if (!bar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    bar.style.width = docHeight > 0 ? (scrollTop / docHeight * 100) + '%' : '0%';
});

function voltarPagina() {
    const overlay = document.getElementById('fade-overlay');
    overlay.classList.add('active');
    setTimeout(() => { window.location.reload(); }, 320);
}


// ============================================================
// TOGGLE MOBILE / DESKTOP
// ============================================================

function toggleView() {
    STATE.isMobile = !STATE.isMobile;
    document.body.classList.toggle('mobile-mode', STATE.isMobile);
    const lbl = document.getElementById('toggle-label');
    lbl.textContent = STATE.isMobile ? 'Modo Desktop' : 'Modo Mobile';
}


// ============================================================
// SIDEBAR MOBILE
// ============================================================
const headerToggle = document.getElementById('header-toggle');
const atlasSidebar = document.getElementById('atlas-sidebar');
const atlasOverlay = document.getElementById('atlas-overlay');

function closeSidebar() {
    atlasSidebar.classList.remove('active');
    atlasOverlay.classList.remove('active');
    headerToggle.innerHTML = '<i class="fas fa-bars"></i>';
}

headerToggle.addEventListener('click', () => {
    const isOpen = atlasSidebar.classList.toggle('active');
    atlasOverlay.classList.toggle('active', isOpen);
    headerToggle.innerHTML = isOpen
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
});

atlasOverlay.addEventListener('click', closeSidebar);

document.querySelectorAll('.sidebar-nav-links a').forEach(link => {
    link.addEventListener('click', closeSidebar);
});

// ============================================================
// SCROLL SUAVE — header nav + sidebar
// ============================================================
document.querySelectorAll('.header-nav a, .sidebar-nav-links a').forEach(link => {
    link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 60, behavior: 'smooth' });
    });
});

// ============================================================
// SIDE NAV — bolinhas (scroll position puro)
// ============================================================
const atlasDots = document.querySelectorAll('.atlas-dot');
const atlasSections = [
    document.querySelector('#intro-screen'),
    document.querySelector('#section-1'),
    document.querySelector('#pratica'),
    document.querySelector('#section-objetivo'),
];

let isScrollingToDot = false;

function setActiveDot(idx) {
    atlasDots.forEach((d, i) => d.classList.toggle('active', i === idx));
}

atlasDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        const target = atlasSections[i];
        if (!target) return;
        isScrollingToDot = true;
        setActiveDot(i);
        window.scrollTo({ top: target.offsetTop - 60, behavior: 'smooth' });
        clearTimeout(window._dotScrollTimer);
        window._dotScrollTimer = setTimeout(() => {
            isScrollingToDot = false;
        }, 900);
    });
});

function getActiveDotIndex() {
    const scrollY = window.scrollY;
    const winH = window.innerHeight;

    // Objetivo: ativa quando seu topo entra na tela (apenas 10% visível já basta)
    const objetivo = atlasSections[3];
    if (objetivo && scrollY + winH * 0.9 >= objetivo.offsetTop) return 3;

    // Pratica-wrap (sticky): usa range absoluto
    const pratica = atlasSections[2];
    if (pratica) {
        const top = pratica.offsetTop;
        const bottom = top + pratica.offsetHeight;
        if (scrollY >= top && scrollY < bottom) return 2;
    }

    // Seções normais (0 e 1)
    let active = 0;
    [0, 1].forEach(i => {
        const sec = atlasSections[i];
        if (sec && sec.offsetTop <= scrollY + winH * 0.5) active = i;
    });

    return active;
}

function updateDots() {
    if (isScrollingToDot) return;
    setActiveDot(getActiveDotIndex());
}

window.addEventListener('scroll', updateDots, { passive: true });
updateDots();
