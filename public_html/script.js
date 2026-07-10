// Navigation scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile menu
const burger = document.getElementById('navBurger');
const mobileMenu = document.getElementById('mobileMenu');

if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        burger.classList.toggle('active');
    });
}

function closeMobile() {
    if (mobileMenu) mobileMenu.classList.remove('active');
    if (burger) burger.classList.remove('active');
}

// FAQ accordion
function toggleFaq(el) {
    if (!el || !el.parentElement) return;
    const item = el.parentElement;
    const wasActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
    if (!wasActive) item.classList.add('active');
}

// Scroll animations (Intersection Observer)
const fadeEls = document.querySelectorAll('.fade-in');
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(el => observer.observe(el));
} else {
    fadeEls.forEach(el => el.classList.add('visible'));
}

function getScrollOffset() {
    const topBar = document.querySelector('.top-bar');
    const topBarHeight = topBar ? topBar.offsetHeight : 0;
    const navHeight = nav ? nav.offsetHeight : 0;
    return topBarHeight + navHeight + 16;
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const href = a.getAttribute('href');
        if (!href || href === '#') return;

        e.preventDefault();
        const targetId = href.slice(1);
        const target = targetId ? document.getElementById(targetId) : null;

        if (target) {
            const targetTop = target.getBoundingClientRect().top + window.scrollY - getScrollOffset();
            window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
        }

        closeMobile();
    });
});

// Blog category filter (for blog page)
document.querySelectorAll('.blog-category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.blog-category-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.dataset.category;
        document.querySelectorAll('.blog-card[data-category]').forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Parallax scroll effect for background grid nodes
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    document.querySelectorAll('.parallax-node').forEach(node => {
        const speed = parseFloat(node.getAttribute('data-speed')) || 0.1;
        node.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

