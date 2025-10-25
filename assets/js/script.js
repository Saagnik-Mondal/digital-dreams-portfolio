// Unique Digital Dreams Portfolio - Creative & Artistic
console.log('🎨 Digital Dreams Portfolio loaded successfully! ✨');

// Custom cursor functionality
let cursor = document.querySelector('.cursor');
let cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    if (cursor && cursorFollower) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }
});

document.addEventListener('mouseenter', () => {
    if (cursor && cursorFollower) {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
    }
}, true);

document.addEventListener('mouseleave', () => {
    if (cursor && cursorFollower) {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    }
}, true);

// Hover effects for interactive elements
document.querySelectorAll('a, button, .portfolio-card, .btn').forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursor && cursorFollower) {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.5)';
        }
    });

    el.addEventListener('mouseleave', () => {
        if (cursor && cursorFollower) {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        }
    });
});

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing unique Digital Dreams portfolio...');

    // Show main content
    showMainContent();

    // Setup basic interactions
    setupBasicInteractions();

    // Initialize unique effects
    initRevealAnimations();
    initTypingEffect();
    createParticles();

    console.log('✅ Unique portfolio ready with creative effects! ✨');
});

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

// Scroll progress and animations
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrolled / maxScroll) * 100;

    const progressLine = document.querySelector('.progress-line');
    if (progressLine) {
        progressLine.style.width = progress + '%';
    }

    // Parallax effect for floating shapes
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.2);
        const yPos = -(scrolled * speed);
        shape.style.transform = `translateY(${yPos}px)`;
    });

    // Reveal animations
    const reveals = document.querySelectorAll('.reveal-text, .portfolio-card');
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// Initialize reveal animations
function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal-text, .portfolio-card, .skill-item');

    reveals.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `all 0.6s ease ${index * 0.1}s`;
    });
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