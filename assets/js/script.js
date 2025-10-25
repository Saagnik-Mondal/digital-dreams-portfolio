// Global Variables
let particleSystem;
let isLoading = true;
let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
let isTablet = /iPad/i.test(navigator.userAgent);
let prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize Website
function initializeWebsite() {
    setupLoadingScreen();
    setupNavigation();
    setupParticleSystem();
    setupScrollAnimations();
    setupPortfolioInteractions();
    setupContactForm();
    setupModalSystem();
    setupSmoothScrolling();
    setupScrollProgress();
    setupAdvancedScrollEffects();
}

// Custom Cursor
function setupCustomCursor() {
    // Skip on mobile devices
    if (isMobile || isTablet) return;
    
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    // Mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animate cursor
    function animateCursor() {
        // Smooth following
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
        
        cursorOutline.style.left = cursorX + 'px';
        cursorOutline.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hover effects
    document.querySelectorAll('a, button, .portfolio-card, .magnetic-element').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
    
    // Click effects
    document.addEventListener('mousedown', () => {
        cursor.classList.add('click');
    });
    
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('click');
    });
}

// Magnetic Elements
function setupMagneticElements() {
    const magneticElements = document.querySelectorAll('.magnetic-element, .magnetic-btn');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Calculate distance from center
            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = Math.max(rect.width, rect.height) / 2;
            
            if (distance < maxDistance) {
                const strength = 0.3;
                const moveX = x * strength;
                const moveY = y * strength;
                
                element.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0px, 0px)';
        });
    });
}

// Scroll Progress
function setupScrollProgress() {
    const progressLine = document.querySelector('.progress-line');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrolled / maxScroll) * 100;
        
        progressLine.style.width = progress + '%';
    });
}

// Enhanced Loading Screen with Beautiful Animations
function setupLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const progressFill = document.querySelector('.progress-fill');
    const progressPercentage = document.querySelector('.progress-percentage');
    const stages = document.querySelectorAll('.stage');
    const logoSvg = document.querySelector('.logo-svg');
    const particles = document.querySelectorAll('.particle');
    const orbs = document.querySelectorAll('.orb');
    
    let currentProgress = 0;
    let currentStage = 0;
    
    // Enhanced loading stages with more detailed descriptions
    const loadingStages = [
        { duration: 1000, text: 'Initializing Creative Engine...', color: '#667eea' },
        { duration: 1200, text: 'Loading Particle Systems...', color: '#f093fb' },
        { duration: 800, text: 'Preparing Interactive Elements...', color: '#4facfe' },
        { duration: 900, text: 'Optimizing Visual Effects...', color: '#764ba2' },
        { duration: 600, text: 'Calibrating Parallax Systems...', color: '#f5576c' },
        { duration: 500, text: 'Almost Ready...', color: '#00f2fe' },
        { duration: 400, text: 'Welcome to Digital Dreams!', color: '#667eea' }
    ];
    
    // Animate logo on load
    if (logoSvg) {
        logoSvg.style.transform = 'scale(0) rotate(-180deg)';
        logoSvg.style.opacity = '0';
        
        setTimeout(() => {
            logoSvg.style.transition = 'all 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            logoSvg.style.transform = 'scale(1) rotate(0deg)';
            logoSvg.style.opacity = '1';
        }, 300);
    }
    
    // Animate particles with stagger
    particles.forEach((particle, index) => {
        particle.style.animationDelay = `${index * 0.2}s`;
        particle.style.opacity = '0';
        setTimeout(() => {
            particle.style.opacity = '1';
        }, index * 200);
    });
    
    // Animate orbs with different timings
    orbs.forEach((orb, index) => {
        orb.style.transform = 'scale(0)';
        orb.style.opacity = '0';
        setTimeout(() => {
            orb.style.transition = 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            orb.style.transform = 'scale(1)';
            orb.style.opacity = '1';
        }, 500 + (index * 300));
    });
    
    function updateProgress(target, duration, stageColor) {
        const startProgress = currentProgress;
        const progressDiff = target - startProgress;
        const startTime = Date.now();
        
        // Update progress bar color
        if (stageColor) {
            progressFill.style.background = `linear-gradient(90deg, ${stageColor}, #fff)`;
        }
        
        function animateProgress() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 4); // Ease out quart
            
            currentProgress = startProgress + (progressDiff * easeProgress);
            progressFill.style.width = currentProgress + '%';
            progressPercentage.textContent = Math.round(currentProgress);
            
            // Add pulsing effect to percentage
            const pulseScale = 1 + Math.sin(elapsed * 0.01) * 0.1;
            progressPercentage.style.transform = `scale(${pulseScale})`;
            
            if (progress < 1) {
                requestAnimationFrame(animateProgress);
            }
        }
        
        animateProgress();
    }
    
    function nextStage() {
        if (currentStage < loadingStages.length) {
            // Update stage text with enhanced animation
            stages.forEach(stage => {
                stage.classList.remove('active');
                stage.style.transform = 'translateY(20px)';
                stage.style.opacity = '0';
            });
            
            const currentStageElement = stages[currentStage];
            if (currentStageElement) {
                currentStageElement.classList.add('active');
                currentStageElement.style.color = loadingStages[currentStage].color;
                
                // Animate stage text in
                setTimeout(() => {
                    currentStageElement.style.transform = 'translateY(0)';
                    currentStageElement.style.opacity = '1';
                }, 100);
            }
            
            const targetProgress = ((currentStage + 1) / loadingStages.length) * 100;
            const stageDuration = loadingStages[currentStage].duration;
            const stageColor = loadingStages[currentStage].color;
            
            updateProgress(targetProgress, stageDuration, stageColor);
            
            // Add particle burst effect for each stage
            createParticleBurst();
            
            currentStage++;
            
            if (currentStage < loadingStages.length) {
                setTimeout(nextStage, stageDuration + 300);
            } else {
                // Loading complete with enhanced exit animation
                setTimeout(() => {
                    // Final animation sequence
                    logoSvg.style.transform = 'scale(1.2) rotate(360deg)';
                    progressFill.style.background = 'linear-gradient(90deg, #667eea, #764ba2, #f093fb)';
                    
                    setTimeout(() => {
                        loadingScreen.classList.add('hide');
                        loadingScreen.style.transform = 'scale(1.1)';
                        loadingScreen.style.filter = 'blur(10px)';
                        isLoading = false;
                        
                        setTimeout(() => {
                            loadingScreen.style.display = 'none';
                            startHeroAnimations();
                            setupCustomCursor();
                            setupMagneticElements();
                            
                            // Initialize advanced WebGL effects
                            if (typeof window.initAdvancedEffects === 'function') {
                                window.initAdvancedEffects();
                            }
                        }, 1200);
                    }, 500);
                }, 1000);
            }
        }
    }
    
    // Create particle burst effect
    function createParticleBurst() {
        const burstContainer = document.querySelector('.loading-container');
        
        for (let i = 0; i < 8; i++) {
            const burstParticle = document.createElement('div');
            burstParticle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: ${loadingStages[currentStage]?.color || '#fff'};
                border-radius: 50%;
                top: 50%;
                left: 50%;
                pointer-events: none;
                z-index: 10;
            `;
            
            burstContainer.appendChild(burstParticle);
            
            const angle = (i / 8) * Math.PI * 2;
            const distance = 50 + Math.random() * 30;
            const duration = 800 + Math.random() * 400;
            
            burstParticle.animate([
                {
                    transform: 'translate(-50%, -50%) scale(0)',
                    opacity: 1
                },
                {
                    transform: `translate(${Math.cos(angle) * distance - 50}%, ${Math.sin(angle) * distance - 50}%) scale(1)`,
                    opacity: 0
                }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => {
                burstParticle.remove();
            };
        }
    }
    
    // Start loading sequence
    setTimeout(nextStage, 500);
}

// Navigation Setup
function setupNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active link highlighting
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    });
}

// Particle System for Hero Background
function setupParticleSystem() {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    let animationId;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createParticles() {
        particles = [];
        const numberOfParticles = Math.floor((canvas.width * canvas.height) / 15000);
        
        for (let i = 0; i < numberOfParticles; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.8 + 0.2,
                life: Math.random() * 100
            });
        }
    }
    
    function updateParticles() {
        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Wrap around screen
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.y > canvas.height) particle.y = 0;
            if (particle.y < 0) particle.y = canvas.height;
            
            // Pulsing effect
            particle.life += 0.5;
            particle.opacity = 0.5 + Math.sin(particle.life * 0.02) * 0.3;
        });
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            ctx.fill();
            
            // Draw connections
            particles.forEach(otherParticle => {
                const distance = Math.sqrt(
                    Math.pow(particle.x - otherParticle.x, 2) + 
                    Math.pow(particle.y - otherParticle.y, 2)
                );
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });
        });
    }
    
    function animate() {
        if (!isLoading) {
            updateParticles();
            drawParticles();
        }
        animationId = requestAnimationFrame(animate);
    }
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    canvas.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        particles.forEach(particle => {
            const distance = Math.sqrt(
                Math.pow(mouseX - particle.x, 2) + 
                Math.pow(mouseY - particle.y, 2)
            );
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.speedX += (mouseX - particle.x) * force * 0.001;
                particle.speedY += (mouseY - particle.y) * force * 0.001;
            }
        });
    });
    
    // Initialize
    resizeCanvas();
    createParticles();
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });
}

// Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger specific animations based on element
                if (entry.target.classList.contains('section-title')) {
                    animateCounter(entry.target);
                }
                
                if (entry.target.classList.contains('portfolio-item')) {
                    entry.target.style.animationDelay = 
                        Array.from(entry.target.parentNode.children).indexOf(entry.target) * 0.1 + 's';
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.section-title, .section-subtitle, .portfolio-item, .skill-item, .contact-item, .fade-in').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Portfolio Interactions
function setupPortfolioInteractions() {
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    
    portfolioCards.forEach(card => {
        // 3D tilt effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
        });
        
        // Click to open modal
        card.addEventListener('click', () => {
            openPortfolioModal(card);
        });
    });
}

// Portfolio Modal System
function setupModalSystem() {
    const modal = document.getElementById('portfolio-modal');
    const closeBtn = document.querySelector('.close');
    
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function openPortfolioModal(card) {
    const modal = document.getElementById('portfolio-modal');
    const modalTitle = document.querySelector('.modal-title');
    const modalDescription = document.querySelector('.modal-description');
    const modalImage = document.querySelector('.modal-image');
    
    const title = card.querySelector('h3').textContent;
    const description = card.querySelector('p').textContent;
    const category = card.closest('.portfolio-item').dataset.category;
    
    modalTitle.textContent = title;
    modalDescription.textContent = `${description} - This is a ${category} piece showcasing creativity and technical skill. Full details and process documentation would be available here.`;
    
    // Add placeholder content based on category
    if (category === 'animation') {
        modalImage.innerHTML = '<i class="fas fa-play-circle" style="font-size: 4rem; color: #f093fb;"></i>';
    } else if (category === 'illustration') {
        modalImage.innerHTML = '<i class="fas fa-image" style="font-size: 4rem; color: #667eea;"></i>';
    } else if (category === 'drawing') {
        modalImage.innerHTML = '<i class="fas fa-pencil-alt" style="font-size: 4rem; color: #4facfe;"></i>';
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Animate modal appearance
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'translate(-50%, -50%) scale(1)';
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('portfolio-modal');
    modal.style.opacity = '0';
    modal.querySelector('.modal-content').style.transform = 'translate(-50%, -50%) scale(0.8)';
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Contact Form
function setupContactForm() {
    const form = document.querySelector('.contact-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const button = form.querySelector('.btn-primary');
        const originalText = button.innerHTML;
        
        // Animate button
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        button.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            button.style.background = '#10b981';
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
                button.disabled = false;
                form.reset();
            }, 2000);
        }, 2000);
    });
    
    // Form input animations
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentNode.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentNode.classList.remove('focused');
            }
        });
    });
}

// Smooth Scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function startHeroAnimations() {
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-buttons');
    
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

function animateCounter(element) {
    const text = element.textContent;
    const numbers = text.match(/\d+/);
    
    if (numbers) {
        const number = parseInt(numbers[0]);
        let current = 0;
        const increment = number / 60;
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            element.textContent = text.replace(numbers[0], Math.floor(current));
        }, 16);
    }
}

// Advanced Effects
function createFloatingElements() {
    const hero = document.querySelector('.hero');
    const numberOfElements = 15;
    
    for (let i = 0; i < numberOfElements; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.style.cssText = `
            position: absolute;
            width: ${Math.random() * 60 + 20}px;
            height: ${Math.random() * 60 + 20}px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 3 + 2}s ease-in-out infinite alternate;
            animation-delay: ${Math.random() * 2}s;
        `;
        hero.appendChild(element);
    }
}

// Performance Optimizations
function throttle(func, wait) {
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

// Debounce function for resize events
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

// Enhanced Parallax Scroll Effects
const setupParallaxScrolling = () => {
    const parallaxElements = document.querySelectorAll('.parallax-element, .scroll-parallax');
    const heroBackground = document.querySelector('.hero-background');
    const parallaxShapes = document.querySelectorAll('.parallax-shape');
    
    const handleParallaxScroll = throttle(() => {
        const scrolled = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Hero background parallax
        if (heroBackground && scrolled < windowHeight) {
            const rate = scrolled * -0.3;
            heroBackground.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
        
        // Parallax shapes movement
        parallaxShapes.forEach((shape, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = scrolled * speed;
            const rotation = scrolled * 0.02 * (index + 1);
            shape.style.transform = `translate3d(0, ${yPos}px, 0) rotate(${rotation}deg)`;
        });
        
        // Portfolio cards parallax
        const portfolioCards = document.querySelectorAll('.portfolio-card');
        portfolioCards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.top + rect.height / 2;
            const windowCenter = windowHeight / 2;
            const distance = cardCenter - windowCenter;
            const parallaxValue = distance * -0.1;
            
            if (rect.top < windowHeight && rect.bottom > 0) {
                card.style.transform = `translateY(${parallaxValue}px)`;
            }
        });
        
        // Section titles parallax
        const sectionTitles = document.querySelectorAll('.section-title');
        sectionTitles.forEach((title) => {
            const rect = title.getBoundingClientRect();
            if (rect.top < windowHeight && rect.bottom > 0) {
                const parallaxValue = (windowHeight - rect.top) * 0.05;
                title.style.transform = `translateY(${parallaxValue}px)`;
            }
        });
        
        // Floating elements parallax
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((element, index) => {
            const speed = 0.2 + (index * 0.1);
            const yPos = scrolled * speed;
            const rotation = scrolled * 0.05 * (index + 1);
            element.style.transform = `translate3d(0, ${yPos}px, 0) rotate(${rotation}deg)`;
        });
        
    }, 16);
    
    window.addEventListener('scroll', handleParallaxScroll);
    
    // Initial call
    handleParallaxScroll();
};

// Mouse parallax effect
const setupMouseParallax = () => {
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = (e.clientY / window.innerHeight) * 2 - 1;
        
        // Apply mouse parallax to floating elements
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((element, index) => {
            const intensity = 10 + (index * 5);
            const x = mouseX * intensity;
            const y = mouseY * intensity;
            element.style.transform += ` translate3d(${x}px, ${y}px, 0)`;
        });
        
        // Apply mouse parallax to parallax shapes
        const parallaxShapes = document.querySelectorAll('.parallax-shape');
        parallaxShapes.forEach((shape, index) => {
            const intensity = 15 + (index * 8);
            const x = mouseX * intensity;
            const y = mouseY * intensity;
            shape.style.transform += ` translate3d(${x}px, ${y}px, 0)`;
        });
    });
};

// Initialize parallax effects
document.addEventListener('DOMContentLoaded', () => {
    if (!prefersReducedMotion && !isMobile) {
        setupParallaxScrolling();
        setupMouseParallax();
    }
});

// Preload images for better performance
function preloadImages() {
    const imageUrls = [
        // Add your actual image URLs here
        // 'assets/animations/animation1.jpg',
        // 'assets/illustrations/illustration1.jpg',
        // 'assets/drawings/drawing1.jpg'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Initialize advanced features when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    createFloatingElements();
    preloadImages();
    setupPremiumInteractions();
    setupEnhancedParticles();
    setupTextRevealAnimations();
});

// Premium Interactions
function setupPremiumInteractions() {
    // Ripple effect on click
    document.addEventListener('click', (e) => {
        if (e.target.closest('.magnetic-btn')) {
            const btn = e.target.closest('.magnetic-btn');
            const ripple = btn.querySelector('.btn-ripple');
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.transform = 'translate(-50%, -50%) scale(0)';
            ripple.style.opacity = '1';
            
            requestAnimationFrame(() => {
                ripple.style.transform = 'translate(-50%, -50%) scale(4)';
                ripple.style.opacity = '0';
            });
        }
    });
    
    // Enhanced portfolio card interactions
    document.querySelectorAll('.portfolio-card').forEach(card => {
        let timeout;
        
        card.addEventListener('mouseenter', () => {
            clearTimeout(timeout);
            card.style.transform = 'translateY(-20px) rotateX(10deg) rotateY(5deg)';
            card.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            timeout = setTimeout(() => {
                card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
                card.style.boxShadow = '';
            }, 100);
        });
        
        // 3D tilt effect based on mouse position
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 8;
            const rotateY = (centerX - x) / 8;
            
            card.style.transform = `translateY(-20px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
    });
    
    // Smooth reveal animations on scroll
    const revealElements = document.querySelectorAll('.text-reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0s';
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(el => revealObserver.observe(el));
}

// Enhanced Particle System
function setupEnhancedParticles() {
    // Skip on mobile devices or if user prefers reduced motion
    if (isMobile || prefersReducedMotion) return;
    
    const hero = document.querySelector('.hero');
    const particleCount = isTablet ? 25 : 50; // Reduce particles on tablets
    const particles = [];
    
    // Create particle elements
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: 3px;
            height: 3px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
        `;
        
        particles.push({
            element: particle,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            life: Math.random() * 100
        });
        
        hero.appendChild(particle);
    }
    
    // Animate particles
    function animateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life += 0.5;
            
            // Boundary check
            if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
            if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;
            
            // Update position and opacity
            const opacity = 0.3 + Math.sin(particle.life * 0.02) * 0.3;
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
            particle.element.style.opacity = opacity;
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

// Text Reveal Animations
function setupTextRevealAnimations() {
    const textElements = document.querySelectorAll('.section-title, .hero-subtitle');
    
    textElements.forEach(element => {
        const text = element.textContent;
        element.innerHTML = '';
        
        // Split text into spans
        text.split(' ').forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.style.cssText = `
                display: inline-block;
                opacity: 0;
                transform: translateY(50px);
                transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
                transition-delay: ${index * 0.1}s;
            `;
            element.appendChild(span);
        });
    });
    
    // Trigger animations on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const spans = entry.target.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.opacity = '1';
                    span.style.transform = 'translateY(0)';
                });
            }
        });
    }, { threshold: 0.1 });
    
    textElements.forEach(el => observer.observe(el));
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% { transform: translateY(0px) rotate(0deg); }
        100% { transform: translateY(-20px) rotate(10deg); }
    }
    
    .floating-element {
        pointer-events: none;
        z-index: 1;
    }
    
    .portfolio-card {
        transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
    }
    
    .modal-content {
        transform: translate(-50%, -50%) scale(0.8);
        transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
    }
    
    .form-group.focused input,
    .form-group.focused textarea {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(245, 158, 11, 0.15);
    }
`;
document.head.appendChild(style);

// Accessibility enhancements
function setupAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        transition: top 0.3s;
        z-index: 10000;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Keyboard navigation for portfolio cards
    document.querySelectorAll('.portfolio-card').forEach((card, index) => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `View portfolio item ${index + 1}`);
        
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openPortfolioModal(card);
            }
        });
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', setupAccessibility);

// Advanced Scroll Effects with GSAP
function setupAdvancedScrollEffects() {
    // Skip if GSAP is not available or on mobile
    if (typeof gsap === 'undefined' || isMobile) return;
    
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero parallax effect
    gsap.to('.hero-background', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
    
    // Portfolio cards stagger animation
    gsap.fromTo('.portfolio-card', {
        y: 100,
        opacity: 0,
        scale: 0.8
    }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.portfolio-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Section titles reveal
    gsap.fromTo('.section-title', {
        y: 50,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.section-title',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Skills animation
    gsap.fromTo('.skill-item', {
        x: -50,
        opacity: 0
    }, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.skills',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Contact section reveal
    gsap.fromTo('.contact-content', {
        y: 80,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Morphing shapes animation
    gsap.to('.morph-shape', {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'none'
    });
    
    // Floating elements
    gsap.to('.floating-element', {
        y: -30,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        stagger: 0.5
    });
}

// Enhanced Page Transitions
function createPageTransition() {
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    transition.innerHTML = '<div class="transition-text">Loading...</div>';
    document.body.appendChild(transition);
    
    gsap.to(transition, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => {
            setTimeout(() => {
                gsap.to(transition, {
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.out',
                    onComplete: () => {
                        document.body.removeChild(transition);
                    }
                });
            }, 1000);
        }
    });
}

// Magnetic field effect for buttons
function createMagneticField() {
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });
}

// Export functions for global use
window.scrollToSection = scrollToSection;
window.createPageTransition = createPageTransition;
