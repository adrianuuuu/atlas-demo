// ============================================================
// CONFIGURAÇÃO — cole aqui a URL do seu Cloudflare Worker
// Exemplo: 'https://atlas-proxy.seu-usuario.workers.dev'
// ============================================================
const N8N_WEBHOOK = 'https://stickydugong-n8n.cloudfy.live/webhook/atlas-demo';

// ============================================================
// ESTADO GLOBAL (volátil — perde no reload)
// ============================================================
const STATE = {
    messages: [],       // {role, content}
    chamadoCounter: 0,  // contador fictício
    isTyping: false,
    userName: null,
    firstMessage: true,
    isMobile: false,
    sessionId: 'demo-' + Math.random().toString(36).substring(2, 10) // ID volátil por sessão
};


// ============================================================
// INPUT EVENTS
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('msg-input');

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    input.addEventListener('input', () => autoResize(input));
});

// ============================================================
// REVEAL ANIMATIONS — Intersection Observer
// ============================================================
function initReveal() {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .fade-up');
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
    }, { threshold: 0.15 });
    els.forEach(el => obs.observe(el));
}

// ============================================================
// JARALLAX INIT
// ============================================================
function initJarallax() {
    if (typeof jarallax !== 'undefined') {
        jarallax(document.querySelectorAll('.jarallax'), {
            speed: 0.5,
            imgSrc: 'assets/iaBackground.jpg'
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initReveal();
    initJarallax();
});

function startDemo() {
    const app = document.getElementById('app');
    document.body.classList.add('app-open');
    document.body.style.overflow = 'hidden';

    const wrapper = app.querySelector('.wa-wrapper');
    if (wrapper) wrapper.classList.remove('show');

    app.style.setProperty('display', 'flex', 'important');
    setTimeout(() => {
        app.classList.add('visible');
        if (wrapper) setTimeout(() => wrapper.classList.add('show'), 80);
    }, 30);

    document.getElementById('date-label').textContent = getTodayLabel();
}
// ============================================================
// HEADER — blur ao rolar
// ============================================================
const siteHeader = document.getElementById('site-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        siteHeader.classList.add('scrolled');
    } else {
        siteHeader.classList.remove('scrolled');
    }
});
