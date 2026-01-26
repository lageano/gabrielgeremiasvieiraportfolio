// Portfolio JavaScript com estilo GTA 6

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initLoader();
    initNavbar();
    initScrollAnimations();
    initSkillBars();
    initParallax();
    initSmoothScroll();
    initCounters();
    initBackToTop();
});

// Loader inspirado no GTA 6
function initLoader() {
    const loader = document.getElementById('loader');
    const progressBar = document.querySelector('.loader-progress');
    const percentage = document.querySelector('.loader-percentage');
    
    let progress = 0;
    const duration = 3000; // 3 segundos
    const interval = 50; // Atualiza a cada 50ms
    const increment = (100 / (duration / interval));
    
    const progressInterval = setInterval(() => {
        progress += increment;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            
            // Aguarda um pouco antes de esconder o loader
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.style.overflow = 'auto';
                
                // Remove o loader do DOM após a transição
                setTimeout(() => {
                    loader.remove();
                    // Trigger hero animations after loader
                    triggerHeroAnimations();
                }, 500);
            }, 500);
        }
        
        progressBar.style.width = progress + '%';
        percentage.textContent = Math.floor(progress) + '%';
    }, interval);
    
    // Esconde o overflow do body durante o loading
    document.body.style.overflow = 'hidden';
}

// Trigger hero animations
function triggerHeroAnimations() {
    const heroElements = document.querySelectorAll('.hero-subtitle, .hero-description, .hero-location, .hero-btn, .hero-social, .scroll-indicator');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Navbar functionality com efeitos GTA 6
function initNavbar() {
    const navbar = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.borderBottom = '1px solid rgba(255, 107, 53, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.borderBottom = '1px solid rgba(255, 107, 53, 0.1)';
        }
    });
    
    // Active nav link
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
}

// Scroll animations estilo GTA 6
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Trigger skill bars animation
                if (entry.target.classList.contains('skill-item')) {
                    animateSkillBar(entry.target);
                }
                
                // Trigger counter animation
                if (entry.target.classList.contains('stat-item')) {
                    animateCounter(entry.target);
                }
                
                // Add special effects for project cards
                if (entry.target.classList.contains('project-card')) {
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, 200);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.project-card, .skill-item, .stat-item, .timeline-item, .contact-item, .tech-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Skill bars animation
function animateSkillBar(skillItem) {
    const progressBar = skillItem.querySelector('.skill-progress');
    if (progressBar && !progressBar.classList.contains('animated')) {
        const width = progressBar.getAttribute('data-width');
        setTimeout(() => {
            progressBar.style.width = width;
            progressBar.classList.add('animated');
        }, 300);
    }
}

// Counter animation
function initCounters() {
    // This will be triggered by scroll animation
}

function animateCounter(statItem) {
    const counter = statItem.querySelector('.stat-number');
    if (counter && !counter.classList.contains('animated')) {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 16);
        
        counter.classList.add('animated');
    }
}

// Parallax effects estilo GTA 6
function initParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Hero section parallax
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.transform = `translateY(${rate * 0.3}px)`;
        }
        
        // Parallax backgrounds
        const parallaxSections = document.querySelectorAll('.parallax-section');
        parallaxSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const windowHeight = window.innerHeight;
            
            if (scrolled + windowHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
                const yPos = -(scrolled - sectionTop) * 0.5;
                const bg = section.querySelector('.section-bg');
                if (bg) {
                    bg.style.transform = `translateY(${yPos}px)`;
                }
            }
        });
        
        // Floating particles effect
        const particles = document.querySelector('.hero-particles');
        if (particles) {
            particles.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                // Smooth scroll with easing
                smoothScrollTo(offsetTop, 1000);
            }
        });
    });
}

// Custom smooth scroll function with easing
function smoothScrollTo(target, duration) {
    const start = window.pageYOffset;
    const distance = target - start;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, start, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Back to top button
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScrollTo(0, 1000);
        });
    }
}

// Project card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(255, 107, 53, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
});

// Tech items hover effects
document.addEventListener('DOMContentLoaded', function() {
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.1)';
            this.style.background = 'rgba(255, 107, 53, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.background = 'rgba(255, 255, 255, 0.05)';
        });
    });
});

// Image Gallery Functions
function changeImage(project, imageSrc) {
    event.preventDefault(); // Prevent default behavior
    const mainImage = document.getElementById(project + '-main');
    const thumbs = document.querySelectorAll(`[onclick*="${project}"]`);
    
    if (mainImage) {
        // Add fade effect
        mainImage.style.opacity = '0.5';
        
        setTimeout(() => {
            mainImage.src = imageSrc;
            mainImage.style.opacity = '1';
        }, 150);
    }
    
    // Update active thumb
    thumbs.forEach(thumb => {
        thumb.classList.remove('active');
        if (thumb.getAttribute('onclick').includes(imageSrc)) {
            thumb.classList.add('active');
        }
    });
    
    return false; // Prevent navigation
}

// GIF Modal Functions
function openGifModal(mediaSrc) {
    event.preventDefault(); // Prevent default link behavior
    const modal = document.getElementById('gifModal');
    const modalImage = document.getElementById('gifModalImage');
    const modalVideo = document.getElementById('gifModalVideo');
    const videoSource = modalVideo.querySelector('source');
    
    if (modal && modalImage && modalVideo) {
        // Check if it's a video file
        if (mediaSrc.endsWith('.mp4') || mediaSrc.endsWith('.webm') || mediaSrc.endsWith('.ogg')) {
            // Show video, hide image
            modalImage.style.display = 'none';
            modalVideo.style.display = 'block';
            videoSource.src = mediaSrc;
            modalVideo.load(); // Reload the video element
        } else {
            // Show image, hide video
            modalVideo.style.display = 'none';
            modalImage.style.display = 'block';
            modalImage.src = mediaSrc;
        }
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    return false; // Prevent navigation
}

function closeGifModal() {
    const modal = document.getElementById('gifModal');
    const modalVideo = document.getElementById('gifModalVideo');
    
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore background scrolling
        
        // Pause video if it's playing
        if (modalVideo && !modalVideo.paused) {
            modalVideo.pause();
        }
    }
}

// Close modal when clicking outside the image
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('gifModal');
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeGifModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeGifModal();
        }
    });
});

// Initialize gallery on page load
document.addEventListener('DOMContentLoaded', function() {
    // Set initial active thumbs
    const galleries = document.querySelectorAll('.project-image-gallery');
    galleries.forEach(gallery => {
        const firstThumb = gallery.querySelector('.thumb-image');
        if (firstThumb) {
            firstThumb.classList.add('active');
        }
    });
});

// Loading animation for page load
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Scroll-triggered animations for sections
function initSectionAnimations() {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                
                // Animate section elements
                const sectionElements = entry.target.querySelectorAll('.section-header, .about-content, .skills-category, .projects-category');
                sectionElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            }
        });
    }, {
        threshold: 0.2
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
        
        // Set initial state
        const sectionElements = section.querySelectorAll('.section-header, .about-content, .skills-category, .projects-category');
        sectionElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        });
    });
}

// Initialize section animations
initSectionAnimations();

// Utility function for debouncing scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    // Add any additional scroll-based functionality here
    updateScrollProgress();
}, 10);

// Scroll progress indicator
function updateScrollProgress() {
    const scrollProgress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    // You can use this to create a scroll progress bar if needed
    // const progressBar = document.querySelector('.scroll-progress');
    // if (progressBar) {
    //     progressBar.style.width = scrollProgress + '%';
    // }
}

window.addEventListener('scroll', optimizedScrollHandler);

// Mobile menu improvements
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            // Add custom mobile menu animations
            setTimeout(() => {
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.style.background = 'rgba(10, 10, 10, 0.98)';
                    navbarCollapse.style.backdropFilter = 'blur(20px)';
                }
            }, 100);
        });
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
        
        // Close GIF modal if open
        closeGifModal();
    }
});

// Performance optimization
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize performance optimizations
optimizePerformance();

// Console log for debugging
console.log('Portfolio GTA 6 Style - Loaded successfully!');
console.log('Features: Loader, Parallax, Smooth Scroll, Animations');

// Easter egg - Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activated
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 3000);
        konamiCode = [];
    }
});


// Back to Top Button functionality
document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.querySelector('.back-to-top-btn');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScrollTo(0, 1000);
        });
    }
});

/* ============================================================
   ALLIANCE SERVER CUSTOM GALLERY LOGIC - TOTALMENTE ISOLADO
   ============================================================ */
let allianceCurrentIndex = 0;
const allianceImages = [];
for(let i=1; i<=39; i++) {
    allianceImages.push(`assets/fotos/projetos-particulares/alliance-server/alliance_${i}.jpeg`);
}

function changeAllianceImage(element, src) {
    const mainImg = document.getElementById('alliance-main-img');
    if(!mainImg) return;
    
    mainImg.style.opacity = '0';
    setTimeout(() => {
        mainImg.src = src;
        mainImg.style.opacity = '1';
    }, 200);

    // Update active thumb
    document.querySelectorAll('.alliance-thumb-item').forEach(img => img.classList.remove('active'));
    element.classList.add('active');

    // Update index for lightbox
    allianceCurrentIndex = allianceImages.indexOf(src);
    updateAllianceProgress();
}

function scrollAllianceCarousel(direction) {
    const track = document.getElementById('alliance-track');
    if(!track) return;
    const scrollAmount = 200;
    track.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}

function updateAllianceProgress() {
    const progress = document.getElementById('alliance-progress');
    if(!progress) return;
    const percentage = ((allianceCurrentIndex + 1) / allianceImages.length) * 100;
    progress.style.width = percentage + '%';
}

// Lightbox Logic
function openAllianceLightbox() {
    const modal = document.getElementById('allianceLightbox');
    const lightboxImg = document.getElementById('allianceLightboxImg');
    const caption = document.getElementById('allianceLightboxCaption');
    
    if(!modal || !lightboxImg) return;
    
    modal.style.display = 'flex';
    lightboxImg.src = allianceImages[allianceCurrentIndex];
    caption.innerText = `Imagem ${allianceCurrentIndex + 1} de ${allianceImages.length}`;
}

function closeAllianceLightbox() {
    const modal = document.getElementById('allianceLightbox');
    if(modal) modal.style.display = 'none';
}

function changeAllianceLightboxImage(direction) {
    allianceCurrentIndex += direction;
    if (allianceCurrentIndex >= allianceImages.length) allianceCurrentIndex = 0;
    if (allianceCurrentIndex < 0) allianceCurrentIndex = allianceImages.length - 1;
    
    const lightboxImg = document.getElementById('allianceLightboxImg');
    const caption = document.getElementById('allianceLightboxCaption');
    
    if(lightboxImg) lightboxImg.src = allianceImages[allianceCurrentIndex];
    if(caption) caption.innerText = `Imagem ${allianceCurrentIndex + 1} de ${allianceImages.length}`;
    
    // Sync main view and carousel
    const thumbs = document.querySelectorAll('.alliance-thumb-item');
    if(thumbs[allianceCurrentIndex]) {
        const mainImg = document.getElementById('alliance-main-img');
        if(mainImg) mainImg.src = allianceImages[allianceCurrentIndex];
        
        document.querySelectorAll('.alliance-thumb-item').forEach(img => img.classList.remove('active'));
        thumbs[allianceCurrentIndex].classList.add('active');
        
        thumbs[allianceCurrentIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        updateAllianceProgress();
    }
}

// Close on click outside or ESC
window.addEventListener('click', (e) => {
    const modal = document.getElementById('allianceLightbox');
    if (e.target === modal) closeAllianceLightbox();
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllianceLightbox();
    const modal = document.getElementById('allianceLightbox');
    if (modal && modal.style.display === 'flex') {
        if (e.key === 'ArrowRight') changeAllianceLightboxImage(1);
        if (e.key === 'ArrowLeft') changeAllianceLightboxImage(-1);
    }
});

