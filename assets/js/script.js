// Unique Digital Dreams Portfolio - Creative & Artistic
console.log('🎨 Digital Dreams Portfolio loaded successfully! ✨');

// Enhanced Interactive Cursor System
let cursor = document.querySelector('.cursor');
let cursorFollower = document.querySelector('.cursor-follower');
let cursorTrail = document.querySelector('.cursor-trail');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (cursor) {
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    }
});

// Smooth cursor follower animation
function updateCursorFollower() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;

    trailX += (mouseX - trailX) * 0.08;
    trailY += (mouseY - trailY) * 0.08;

    if (cursorFollower) {
        cursorFollower.style.left = cursorX + 'px';
        cursorFollower.style.top = cursorY + 'px';
    }

    if (cursorTrail) {
        cursorTrail.style.left = trailX + 'px';
        cursorTrail.style.top = trailY + 'px';
    }

    requestAnimationFrame(updateCursorFollower);
}
updateCursorFollower();

// Enhanced hover interactions
document.addEventListener('mouseenter', () => {
    if (cursor && cursorFollower && cursorTrail) {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
        cursorTrail.style.opacity = '1';
    }
}, true);

document.addEventListener('mouseleave', () => {
    if (cursor && cursorFollower && cursorTrail) {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
        cursorTrail.style.opacity = '0';
    }
}, true);

// Dynamic hover effects based on element type
document.querySelectorAll('a, button, .portfolio-card, .btn, .magnetic-element').forEach(el => {
    el.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.1;
        const deltaY = (e.clientY - centerY) * 0.1;

        if (cursor && cursorFollower) {
            cursor.style.transform = 'scale(2) translate(' + deltaX + 'px, ' + deltaY + 'px)';
            cursorFollower.style.transform = 'scale(1.5) translate(' + deltaX + 'px, ' + deltaY + 'px)';
            cursorFollower.style.borderColor = 'rgba(102, 126, 234, 0.8)';
        }

        // Add magnetic effect
        this.style.transform = 'scale(1.02) translate(' + deltaX * 0.5 + 'px, ' + deltaY * 0.5 + 'px)';
    });

    el.addEventListener('mouseleave', function() {
        if (cursor && cursorFollower) {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
            cursorFollower.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        }

        // Reset magnetic effect
        this.style.transform = 'scale(1)';
    });
});

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing fluid Digital Dreams portfolio...');

    // Start loading sequence
    startLoadingSequence();
});

// Initialize the main portfolio with enhanced fluidity
function initializePortfolio() {
    console.log('🎨 Initializing fluid portfolio experience...');

    // Show main content
    showMainContent();

    // Setup enhanced interactions
    setupBasicInteractions();
    enhanceNavigation();
    initPresenceDetection();

    // Initialize fluid effects
    initRevealAnimations();
    initTypingEffect();
    createParticles();

    console.log('✅ Fluid portfolio ready with enhanced interactions! ✨');
}

// Sophisticated Loading Sequence
function startLoadingSequence() {
    const loadingScreen = document.getElementById('loading-screen');

    if (!loadingScreen) {
        console.log('No loading screen found, initializing directly...');
        initializePortfolio();
        return;
    }

    console.log('🎯 Starting sophisticated loading sequence...');

    // Show loading screen
    loadingScreen.style.display = 'flex';

    // Update progress and status
    const progressFill = document.querySelector('.progress-fill');
    const progressPercentage = document.querySelector('.progress-percentage');
    const loadingStatus = document.querySelector('.loading-status');
    const indicatorDots = document.querySelectorAll('.indicator-dot');

    let progress = 0;
    const totalTime = 3000; // 3 seconds total
    const updateInterval = 50; // Update every 50ms
    const progressIncrement = (updateInterval / totalTime) * 100;

    const progressInterval = setInterval(() => {
        progress += progressIncrement;

        if (progressFill) {
            progressFill.style.width = Math.min(progress, 100) + '%';
        }

        if (progressPercentage) {
            progressPercentage.textContent = Math.round(Math.min(progress, 100)) + '%';
        }

        // Update status messages
        if (loadingStatus) {
            if (progress < 30) {
                loadingStatus.textContent = 'Loading assets...';
                if (indicatorDots[0]) indicatorDots[0].style.background = 'var(--glow-color)';
            } else if (progress < 70) {
                loadingStatus.textContent = 'Preparing interface...';
                if (indicatorDots[1]) indicatorDots[1].style.background = 'var(--glow-color)';
            } else if (progress < 100) {
                loadingStatus.textContent = 'Almost ready...';
                if (indicatorDots[2]) indicatorDots[2].style.background = 'var(--glow-color)';
            }
        }

        if (progress >= 100) {
            clearInterval(progressInterval);

            // Complete loading
            setTimeout(() => {
                console.log('✅ Loading sequence complete!');

                // Smooth fade-out
                loadingScreen.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                loadingScreen.style.opacity = '0';
                loadingScreen.style.transform = 'scale(1.02)';

                // Initialize portfolio
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    initializePortfolio();
                }, 800);
            }, 500);
        }
    }, updateInterval);
}

// Initialize the main portfolio
function initializePortfolio() {
    console.log('🎨 Initializing main portfolio experience...');

    // Show main content
    showMainContent();

    // Setup basic interactions
    setupBasicInteractions();

    // Initialize unique effects
    initRevealAnimations();
    initTypingEffect();
    createParticles();

    console.log('✅ Unique portfolio ready with creative effects! ✨');
}

// Show main content
function showMainContent() {
    // Remove any loading screens
    const loadingScreen = document.getElementById('ai-loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }

    // Make sure body is visible
    document.body.style.overflow = 'auto';
    document.body.style.opacity = '1';

    // Show all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.display = 'block';
        section.style.opacity = '1';
        section.style.visibility = 'visible';
    });

    // Show navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.display = 'block';
        navbar.style.opacity = '1';
    }

    console.log('📱 Main content displayed');
}

// Basic interactions
function setupBasicInteractions() {
    // Smooth scrolling for navigation
    setupSmoothScrolling();

    // Portfolio card hover effects
    setupPortfolioCards();

    // Chatbot toggle
    setupChatbot();

    // Dark mode toggle
    setupDarkMode();
}

// Smooth scrolling
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Portfolio card effects
function setupPortfolioCards() {
    const cards = document.querySelectorAll('.portfolio-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });

        // Click to show modal (simple version)
        card.addEventListener('click', function() {
            const image = this.querySelector('img');
            const title = this.querySelector('h3');
            if (image && title) {
                showSimpleModal(image.src, title.textContent);
            }
        });
    });
}

// Simple modal
function showSimpleModal(imageSrc, title) {
    // Create modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        cursor: pointer;
    `;

    modal.innerHTML = `
        <div style="max-width: 80%; max-height: 80%; position: relative;">
            <img src="${imageSrc}" style="max-width: 100%; max-height: 100%; border-radius: 10px;">
            <h2 style="color: white; text-align: center; margin-top: 20px;">${title}</h2>
        </div>
    `;

    modal.addEventListener('click', () => modal.remove());
    document.body.appendChild(modal);
}

// Chatbot setup
function setupChatbot() {
    const chatbot = document.getElementById('ai-chatbot');
    const toggle = document.querySelector('.chatbot-toggle');
    const windowEl = document.querySelector('.chatbot-window');
    const closeBtn = document.querySelector('.chatbot-close');
    const input = document.querySelector('.chat-input');
    const sendBtn = document.querySelector('.send-btn');
    const messages = document.querySelector('.chatbot-messages');

    if (!toggle || !windowEl) return;

    let isOpen = false;

    toggle.addEventListener('click', () => {
        isOpen = !isOpen;
        windowEl.style.display = isOpen ? 'flex' : 'none';
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            isOpen = false;
            windowEl.style.display = 'none';
        });
    }

    if (sendBtn && input) {
        const sendMessage = () => {
            const message = input.value.trim();
            if (message) {
                addMessage(message, 'user');
                input.value = '';

                // Simple AI response
                setTimeout(() => {
                    const responses = [
                        "Hello! I'm Ronica, your AI creative assistant. I can tell you about the beautiful artworks in this portfolio.",
                        "This portfolio showcases stunning digital art blending traditional Indian culture with modern techniques.",
                        "Feel free to ask me about any of the artworks - animations, illustrations, or drawings!",
                        "Each piece tells a unique story of cultural fusion and artistic innovation."
                    ];
                    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                    addMessage(randomResponse, 'ai');
                }, 1000);
            }
        };

        sendBtn.addEventListener('click', sendMessage);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    function addMessage(text, type) {
        if (!messages) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
            </div>
        `;
        messages.appendChild(messageDiv);
        messages.scrollTop = messages.scrollHeight;
    }

    // Welcome message
    setTimeout(() => {
        addMessage("Namaste! I'm Ronica, your creative AI assistant. Explore this beautiful portfolio and ask me anything about the artworks!", 'ai');
    }, 2000);
}

// Dark mode
function setupDarkMode() {
    const themeSwitch = document.getElementById('theme-switch');
    if (!themeSwitch) return;

    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeSwitch.checked = true;
    }

    // Toggle theme
    themeSwitch.addEventListener('change', () => {
        if (themeSwitch.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Enhanced Fluid Scroll System
let scrollY = 0;
let ticking = false;

function updateScrollEffects() {
    const scrolled = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrolled / maxScroll) * 100;

    // Update scroll progress
    const progressLine = document.querySelector('.progress-line');
    if (progressLine) {
        progressLine.style.width = progress + '%';
    }

    // Enhanced parallax for organic shapes
    const organicShapes = document.querySelectorAll('.organic-shape');
    organicShapes.forEach((shape, index) => {
        const speed = 0.3 + (index * 0.1);
        const rotateSpeed = 0.05 + (index * 0.02);
        const yPos = -(scrolled * speed);
        const rotation = scrolled * rotateSpeed;

        shape.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`;
        shape.style.opacity = Math.max(0.03, 0.08 - (scrolled * 0.0001));
    });

    // Interactive particles respond to scroll
    const particles = document.querySelectorAll('.interactive-particle');
    particles.forEach((particle, index) => {
        const speed = 0.2 + (index * 0.05);
        const yPos = -(scrolled * speed);
        const scale = 1 + Math.sin(scrolled * 0.001 + index) * 0.2;

        particle.style.transform = `translateY(${yPos}px) scale(${scale})`;
    });

    // Fluid reveal animations with stagger
    const reveals = document.querySelectorAll('.reveal-text, .portfolio-card, .skill-item');
    reveals.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const triggerPoint = windowHeight - 50;

        if (elementTop < triggerPoint) {
            const delay = index * 50; // Stagger effect
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0) rotateX(0deg)';
            }, delay);
        }
    });

    // Dynamic background intensity based on scroll
    const interactiveBg = document.querySelector('.interactive-bg');
    if (interactiveBg) {
        const intensity = Math.min(1, scrolled / 500);
        interactiveBg.style.opacity = 0.3 + (intensity * 0.4);
    }

    ticking = false;
}

window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
});

// Mouse movement parallax
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    // Subtle parallax on background elements
    const organicShapes = document.querySelectorAll('.organic-shape');
    organicShapes.forEach((shape, index) => {
        const speed = 10 + (index * 5);
        const xOffset = (mouseX - 0.5) * speed;
        const yOffset = (mouseY - 0.5) * speed;

        shape.style.transform += ` translate(${xOffset}px, ${yOffset}px)`;
    });
});

// Enhanced reveal animations with fluid effects
function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal-text, .portfolio-card, .skill-item, .about-content, .workflow-step');

    reveals.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(40px) rotateX(10deg)';
        element.style.transition = `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.15}s`;
    });
}

// Creative navigation enhancement
function enhanceNavigation() {
    const nav = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!nav) return;

    // Add scroll-based navigation effects
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down - hide nav
            nav.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up - show nav
            nav.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
    });

    // Enhanced nav link hover effects
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(102, 126, 234, 0.3);
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Interactive presence detection
function initPresenceDetection() {
    let userActive = true;
    let activityTimeout;

    function resetActivityTimeout() {
        userActive = true;
        clearTimeout(activityTimeout);

        activityTimeout = setTimeout(() => {
            userActive = false;
            // Subtle "sleep" mode for background elements
            const particles = document.querySelectorAll('.interactive-particle');
            particles.forEach(particle => {
                particle.style.animationDuration = '15s';
                particle.style.opacity = '0.3';
            });
        }, 30000); // 30 seconds of inactivity
    }

    // Activity events
    ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
        document.addEventListener(event, resetActivityTimeout, true);
    });

    // Wake up on activity
    document.addEventListener('mousemove', () => {
        if (!userActive) {
            userActive = true;
            const particles = document.querySelectorAll('.interactive-particle');
            particles.forEach(particle => {
                particle.style.animationDuration = '8s';
                particle.style.opacity = '0.6';
            });
        }
    });

    resetActivityTimeout(); // Initialize
}

// Typing effect for hero subtitle
function initTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;

    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.borderRight = '2px solid var(--glow-color)';

    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            subtitle.style.borderRight = 'none';
        }
    }, 50);
}

// Particle effect on hover
function createParticles() {
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    portfolioCards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            for (let i = 0; i < 5; i++) {
                createParticle(e.clientX, e.clientY);
            }
        });
    });
}

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: var(--primary-gradient);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        left: ${x}px;
        top: ${y}px;
        animation: particleFloat 1s ease-out forwards;
    `;

    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 1000);
}