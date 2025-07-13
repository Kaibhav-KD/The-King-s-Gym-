// 0. Lenis Smooth Scroll
const lenis = new Lenis();
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);


// 1. Loader Animation
const loaderBar = document.querySelector('.loader-bar');
const mainContent = document.querySelector('.main-content');
const navbar = document.querySelector('.navbar');

const loaderTimeline = gsap.timeline({
    onComplete: () => {
        gsap.to('body', { css: { visibility: 'invisible' } });
        gsap.to('.loader', {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                document.querySelector('.loader').style.display = 'none';
                // Start Hero Animation after loader is gone
                document.body.style.visibility = 'visible';
                heroAnimation();
            }
        });
    }
});

loaderTimeline.to(loaderBar, {
    width: '100%',
    duration: 3,
    ease: 'power2.inOut'
});


// 2. Hero Section Animation
function heroAnimation() {
    const heroTimeline = gsap.timeline();

    heroTimeline
        .to('.hero__background', {
            opacity: 0.6,
            scale: 1,
            duration: 1.5,
            ease: 'power2.out'
        })
        .to('.navbar', {
            y: '0%',
            duration: 1,
            ease: 'power3.out'
        }, "-=1.2")
        .to('.hero__title-line', {
            y: '0%',
            stagger: 0.2,
            duration: 1,
            ease: 'power3.out'
        }, "-=0.8")
        .to('.hero__subtitle', {
            opacity: 1,
            duration: 1,
            ease: 'power2.out'
        }, "-=0.5")
        .to('.hero__cta', {
            y: '0%',
            duration: 1,
            ease: 'power3.out'
        }, "-=0.8");
}


// 3. Parallax Backgrounds
const sectionsWithBg = [
    '.section-intro', '.section-features', '.section-trainers', 
    '.section-plans', '.section-contact', '.footer'
];
sectionsWithBg.forEach(selector => {
    const section = document.querySelector(selector);
    if (section) {
        gsap.to(section, {
            backgroundPosition: `50% ${-window.innerHeight / 4}px`,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }
});


// 4. Navbar Scroll Behavior
ScrollTrigger.create({
    start: 'top top',
    end: 99999,
    onUpdate: (self) => {
        const navbar = document.querySelector('.navbar');
        if (self.direction === 1 && self.progress > 0) {
            navbar.classList.add('navbar--scrolled');
        } else {
            navbar.classList.remove('navbar--scrolled');
        }
    }
});


// 5. Intro Text Word Animation
const introText = document.querySelector('.intro__text');
if (introText) {
    const introWords = introText.textContent.split(' ').map(word => {
        const span = document.createElement('span');
        const highlight = word.match(/strength|power|transformation/);
        span.innerHTML = `${word}${highlight ? '' : ' '}`;
        if (highlight) {
            span.classList.add('highlight');
        }
        return span;
    });
    introText.innerHTML = '';
    introWords.forEach(wordSpan => introText.appendChild(wordSpan));
    
    gsap.from(introWords, {
        scrollTrigger: {
            trigger: '.section-intro',
            start: 'top 60%',
        },
        opacity: 0.1,
        y: 30,
        stagger: 0.1,
        duration: 0.8
    });
}


// 6. Features Section Scroll Animation
gsap.utils.toArray('.feature-card').forEach((card, i) => {
    const imageWrapper = card.querySelector('.feature-card__image-wrapper');
    const image = card.querySelector('img');
    const content = card.querySelector('.feature-card__content');

    const cardTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: card,
            start: 'top 70%',
        }
    });

    cardTimeline
        .from(imageWrapper, {
            clipPath: 'inset(45% 45% 45% 45% round 20px)',
            duration: 1,
            ease: 'power4.out'
        })
        .from(image, {
            scale: 1.8,
            duration: 1.2,
            ease: 'power4.out'
        }, 0)
        .from(content.children, {
            opacity: 0,
            y: 50,
            stagger: 0.1,
            duration: 0.5,
            ease: 'power2.out'
        }, 0.3);
});


// 7. Trainers Section Scroll Animation
gsap.from(".section-trainers .section-title", {
    scrollTrigger: { trigger: ".section-trainers", start: "top 70%" },
    opacity: 0, y: 50, duration: 0.6
});

gsap.utils.toArray('.trainer-card').forEach(card => {
    const cardTl = gsap.timeline({
        scrollTrigger: { trigger: card, start: "top 75%" }
    });
    cardTl.from(card, {
        opacity: 0, y: 100, duration: 0.8, ease: 'power3.out'
    }).from(card.querySelector('.trainer-card__image-wrapper'), {
        clipPath: 'inset(100% 0% 0% 0%)', duration: 0.7, ease: 'power3.inOut'
    }, "-=0.5").from(card.querySelectorAll('.trainer-card__content > *'), {
        opacity: 0, y: 30, stagger: 0.1, duration: 0.4
    }, "-=0.4");
});


// 8. Plans Section Scroll Animation
gsap.from(".section-plans .section-title", {
    scrollTrigger: { trigger: ".section-plans", start: "top 70%" },
    opacity: 0, y: 50, duration: 0.6
});

gsap.utils.toArray('.plan-card').forEach(card => {
    const cardTl = gsap.timeline({
        scrollTrigger: { trigger: card, start: "top 75%" }
    });
    cardTl.from(card, {
        opacity: 0, y: 100, scale: 0.95, duration: 0.6, ease: 'power3.out'
    }).from(card.querySelectorAll('.plan-card__header > *'), {
        opacity: 0, y: 30, stagger: 0.1, duration: 0.4
    }, "-=0.3").from(card.querySelectorAll('.plan-card__features li'), {
        opacity: 0, x: -50, stagger: 0.08, duration: 0.4
    }, "-=0.3").from(card.querySelector('.plan-card__cta'), {
        opacity: 0, y: 50, duration: 0.5
    }, "-=0.2");
});


// 9. Testimonials Carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const totalSlides = slides.length;

function showSlide(index) {
    const previousSlide = slides[currentSlide];
    const newSlide = slides[index];

    gsap.timeline()
        .to(previousSlide, { opacity: 0, duration: 0.5, onComplete: () => previousSlide.classList.remove('active') })
        .set(newSlide, { opacity: 0, onComplete: () => newSlide.classList.add('active') })
        .to(newSlide, { opacity: 1, duration: 0.5 });

    currentSlide = index;
}

if (slides.length > 0) {
    slides[0].classList.add('active');
    slides[0].style.opacity = 1;
    
    setInterval(() => {
        let nextSlide = (currentSlide + 1) % totalSlides;
        showSlide(nextSlide);
    }, 5000); // Change slide every 5 seconds
}

gsap.from(".section-testimonials .section-title", {
    scrollTrigger: { trigger: ".section-testimonials", start: "top 70%" },
    opacity: 0, y: 50, duration: 0.6
});
gsap.from(".testimonial-carousel", {
    scrollTrigger: { trigger: ".testimonial-carousel", start: "top 80%" },
    opacity: 0, y: 50, duration: 0.8
});

// 10. Gallery Animation
gsap.from(".section-gallery .section-title", {
    scrollTrigger: { trigger: ".section-gallery", start: "top 70%" },
    opacity: 0, y: 50, duration: 0.6
});

gsap.from(".gallery-item", {
    scrollTrigger: {
        trigger: ".section-gallery",
        start: "top 60%",
    },
    opacity: 0,
    y: 100,
    stagger: 0.1,
    duration: 0.8,
    ease: 'power3.out'
});

// 11. Owner Story Animation
const ownerTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".section-owner",
        start: "top 60%"
    }
});
ownerTl.from(".owner-image", {
    opacity: 0,
    x: -100,
    duration: 0.8,
    ease: 'power3.out'
}).from(".owner-text > *", {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 0.6
}, "-=0.5");

// 12. Contact Section Animation
const contactTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".section-contact",
        start: "top 60%"
    }
});
contactTl.from(".contact-info > *", {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 0.8,
    ease: 'power3.out'
}).from(".form-group", {
    opacity: 0,
    x: 50,
    stagger: 0.2,
    duration: 0.6
}, "-=0.5").from(".contact-form .cta__button", {
    opacity: 0,
    y: 50,
    duration: 0.6
}, "-=0.3");


// 13. Footer Scroll Animation
gsap.from('.footer__content > *', {
    scrollTrigger: {
        trigger: '.footer',
        start: 'top 80%',
        end: 'bottom 90%',
        scrub: 1.5,
    },
    y: 50,
    opacity: 0,
    stagger: 0.2
});

// Contact Form Handling
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Simple validation
    if (!data.name || !data.email || !data.message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        alert('Thank you for your message! We\'ll get back to you soon.');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Enhanced smooth scrolling for all internal links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    img.addEventListener('error', function() {
        this.style.opacity = '0.5';
        this.style.filter = 'grayscale(100%)';
    });
});

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #E63E3A, #FF5F6D);
    z-index: 9999;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
});

// Add intersection observer for better performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .trainer-card, .plan-card, .facility-feature').forEach(el => {
    observer.observe(el);
});

// Add CSS for animate-in class
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .scroll-progress {
        box-shadow: 0 0 10px rgba(230, 62, 58, 0.5);
    }
`;
document.head.appendChild(style);

// Navbar hide on scroll down, show on scroll up or at top
let lastScrollY = window.scrollY;
const navbarEl = document.querySelector('.navbar');
let ticking = false;
let lastDirection = null;
let lastActionScrollY = window.scrollY;
const NAVBAR_HIDE_THRESHOLD = 20; // px

function handleNavbarVisibility() {
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - lastScrollY;
    const direction = scrollDelta > 0 ? 'down' : 'up';

    // Always show at the very top
    if (currentScrollY < 50) {
        navbarEl.style.transform = 'translateY(0)';
        navbarEl.style.opacity = '1';
        lastDirection = null;
        lastActionScrollY = currentScrollY;
    } else if (direction === 'down' && (currentScrollY - lastActionScrollY) > NAVBAR_HIDE_THRESHOLD) {
        // Only hide if scrolled down enough
        navbarEl.style.transform = 'translateY(-100%)';
        navbarEl.style.opacity = '0';
        lastDirection = 'down';
        lastActionScrollY = currentScrollY;
    } else if (direction === 'up' && (lastActionScrollY - currentScrollY) > NAVBAR_HIDE_THRESHOLD) {
        // Only show if scrolled up enough
        navbarEl.style.transform = 'translateY(0)';
        navbarEl.style.opacity = '1';
        lastDirection = 'up';
        lastActionScrollY = currentScrollY;
    }
    lastScrollY = currentScrollY;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(handleNavbarVisibility);
        ticking = true;
    }
});