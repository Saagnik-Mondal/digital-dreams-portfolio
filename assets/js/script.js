// Global Variables
let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// AI Loading Screen
function setupAILoadingScreen() {
    const loadingScreen = document.getElementById('ai-loading-screen');
    const progressFill = document.querySelector('.progress-circle-fill');
    const progressPercentage = document.querySelector('.progress-percentage');
    const stages = document.querySelectorAll('.stage');

    let currentProgress = 0;
    let currentStage = 0;

    const loadingStages = [
        { duration: 1500, text: 'Neural Network Activation', color: '#667eea' },
        { duration: 1200, text: 'Loading Creative Assets', color: '#764ba2' },
        { duration: 1000, text: 'Initializing AI Guide', color: '#f093fb' },
        { duration: 800, text: 'Launching Experience', color: '#00f2fe' }
    ];

    function updateProgress(target, duration, stageColor) {
        const startProgress = currentProgress;
        const progressDiff = target - startProgress;
        const startTime = Date.now();

        function animateProgress() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            currentProgress = startProgress + (progressDiff * easeProgress);
            const circumference = 339.292;
            const offset = circumference - (currentProgress / 100) * circumference;
            progressFill.style.strokeDashoffset = offset;
            progressPercentage.textContent = Math.round(currentProgress) + '%';

            if (progress < 1) {
                requestAnimationFrame(animateProgress);
            }
        }

        animateProgress();
    }

    function nextStage() {
        if (currentStage < loadingStages.length) {
            stages.forEach(stage => stage.classList.remove('active'));
            const currentStageElement = stages[currentStage];
            if (currentStageElement) {
                currentStageElement.classList.add('active');
            }

            const targetProgress = ((currentStage + 1) / loadingStages.length) * 100;
            const stageDuration = loadingStages[currentStage].duration;

            updateProgress(targetProgress, stageDuration);

            currentStage++;

            if (currentStage < loadingStages.length) {
                setTimeout(nextStage, stageDuration + 200);
            } else {
                setTimeout(() => {
                    loadingScreen.style.opacity = '0';
                    loadingScreen.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                        startMainExperience();
                        setupCustomCursor();
                        setupAIChatbot();
                    }, 800);
                }, 1000);
            }
        }
    }

    setTimeout(nextStage, 500);
}

// AI Chatbot
function setupAIChatbot() {
    const chatbot = document.getElementById('ai-chatbot');
    const toggle = document.querySelector('.chatbot-toggle');
    const window = document.querySelector('.chatbot-window');
    const closeBtn = document.querySelector('.chatbot-close');
    const input = document.querySelector('.chat-input');
    const sendBtn = document.querySelector('.send-btn');
    const messages = document.querySelector('.chatbot-messages');

    let isOpen = false;

    toggle.addEventListener('click', () => {
        isOpen = !isOpen;
        window.style.display = isOpen ? 'flex' : 'none';
        toggle.style.transform = isOpen ? 'scale(0.9)' : 'scale(1)';
    });

    closeBtn.addEventListener('click', () => {
        isOpen = false;
        window.style.display = 'none';
        toggle.style.transform = 'scale(1)';
    });

    function sendMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;

        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas ${isUser ? 'fa-user' : 'fa-brain'}"></i>
            </div>
            <div class="message-content">
                <p>${message}</p>
                <div class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
            </div>
        `;

        messages.appendChild(messageDiv);
        messages.scrollTop = messages.scrollHeight;

        if (!isUser) {
            // AI responses
            setTimeout(() => {
                const responses = {
                    'hello': 'Hello! Welcome to my creative portfolio. I\'m here to guide you through my work and answer any questions you have about my creative process.',
                    'about': 'I\'m a digital artist specializing in animations, illustrations, and creative storytelling. Each piece tells a unique story and showcases different techniques.',
                    'animations': 'My animations section features fluid motion graphics and character animations. Click on any piece to see the workflow behind it!',
                    'illustrations': 'The illustrations showcase my digital art style, from concept art to finished pieces. Each one represents hours of creative exploration.',
                    'drawings': 'My traditional drawings combine classic techniques with modern themes. They show the foundation of my artistic journey.',
                    'workflow': 'My workflow typically involves concept development, sketching, digital creation, and final refinement. Each step is crucial to the final result.',
                    'contact': 'Feel free to reach out! I\'m always excited to discuss new projects and creative collaborations.',
                    'default': 'I\'d love to tell you more about my creative process! Ask me about animations, illustrations, drawings, or my workflow.'
                };

                const lowerMessage = message.toLowerCase();
                let response = responses.default;

                for (const [key, value] of Object.entries(responses)) {
                    if (lowerMessage.includes(key)) {
                        response = value;
                        break;
                    }
                }

                sendMessage(response);
            }, 1000 + Math.random() * 1000);
        }
    }

    function handleSend() {
        const message = input.value.trim();
        if (message) {
            sendMessage(message, true);
            input.value = '';
            sendMessage('...'); // AI thinking
        }
    }

    sendBtn.addEventListener('click', handleSend);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    });

    // Welcome message after a delay
    setTimeout(() => {
        sendMessage('Welcome to my AI-powered portfolio! I can help you explore my creative work and understand the process behind each piece. What interests you most?');
    }, 2000);
}

// Initialize Website
function initializeWebsite() {
    setupAILoadingScreen();
}

// After loading screen completes
function startMainExperience() {
    setupNavigation();
    setupScrollAnimations();
    setupPortfolioInteractions();
    setupWorkflowAnimations();
    setupContactForm();
    setupModalSystem();
    setupSmoothScrolling();
    setupScrollProgress();
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
function setupEnhancedLoadingScreen() {
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
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.section-title, .section-subtitle, .portfolio-item, .skill-item, .contact-item').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Custom Cursor
function setupCustomCursor() {
    if (isMobile) return;

    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;

        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
        cursorOutline.style.left = cursorX + 'px';
        cursorOutline.style.top = cursorY + 'px';

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Hover effects
    document.querySelectorAll('a, button, .portfolio-card, .workflow-step').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

// Enhanced Portfolio Interactions
function setupPortfolioInteractions() {
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    portfolioCards.forEach((card, index) => {
        // 3D hover effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 12;
            const rotateY = (centerX - x) / 12;

            card.style.transform = `translateY(-15px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg) scale(1)';
        });

        // Click to open modal
        card.addEventListener('click', () => {
            openPortfolioModal(card);
        });

        // Stagger animation
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Workflow Animations
function setupWorkflowAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${index * 0.2}s`;
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.workflow-step').forEach(step => {
        observer.observe(step);
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

// Export functions for global use
window.scrollToSection = scrollToSection;
// Integrated Parallax System - Works throughout the entire site
function setupIntegratedParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-shape');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    const sections = document.querySelectorAll('[data-parallax="true"]');
    
    // Enhanced scroll performance with integrated parallax
    const optimizedScrollHandler = throttle(() => {
        const scrolled = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Hero background parallax
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground && scrolled < windowHeight) {
            const rate = scrolled * -0.3;
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
        
        // Parallax background shapes
        parallaxElements.forEach((element, index) => {
            const speed = parseFloat(element.dataset.speed) || 0.2;
            const yPos = scrolled * speed;
            const rotation = scrolled * 0.02 * (index + 1);
            element.style.transform = `translate3d(0, ${yPos}px, 0) rotate(${rotation}deg)`;
        });
        
        // Portfolio cards parallax effect
        portfolioCards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.top + rect.height / 2;
            const windowCenter = windowHeight / 2;
            const distance = cardCenter - windowCenter;
            const parallaxValue = distance * -0.05;
            
            if (rect.top < windowHeight && rect.bottom > 0) {
                card.style.transform = `translateY(${parallaxValue}px)`;
            }
        });
        
        // Section background parallax
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top < windowHeight && rect.bottom > 0) {
                const parallaxValue = (windowHeight - rect.top) * 0.1;
                if (section.style) {
                    section.style.transform = `translateY(${parallaxValue * 0.5}px)`;
                }
            }
        });
        
        // Floating elements parallax
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((element, index) => {
            const speed = 0.15 + (index * 0.05);
            const yPos = scrolled * speed;
            const rotation = scrolled * 0.03 * (index + 1);
            element.style.transform = `translate3d(0, ${yPos}px, 0) rotate(${rotation}deg)`;
        });
        
    }, 16);
    
    window.addEventListener('scroll', optimizedScrollHandler);
    
    // Initial call
    optimizedScrollHandler();
}

/**
 * Load images from various sources
 * Supports: External URLs, Local paths, or Data URIs
 */
function loadParallaxImages() {
    const parallaxImages = document.querySelectorAll('.parallax-bg-img');
    
    // You can customize these image sources
    const imageSources = [
        // Unsplash free images (replace with your actual image URLs)
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop', // Mountain
        'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1200&h=600&fit=crop', // Space
        'https://images.unsplash.com/photo-1494783367193-149034c05e41?w=1200&h=600&fit=crop', // Gradient
        'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&h=600&fit=crop', // Ocean
        'https://images.unsplash.com/photo-1500375592092-40eb305acc11?w=1200&h=600&fit=crop'  // Sunset
    ];
    
    parallaxImages.forEach((img, index) => {
        // If the element already has a background-image (SVG), keep it
        // Otherwise, load from external source
        if (!img.style.backgroundImage || img.style.backgroundImage === '') {
            const imageUrl = imageSources[index % imageSources.length];
            
            // Preload image for smooth loading
            const preloadImg = new Image();
            preloadImg.onload = () => {
                img.style.backgroundImage = `url('${imageUrl}')`;
                img.classList.add('animate');
            };
            preloadImg.onerror = () => {
                // Fallback to gradient if image fails to load
                img.style.backgroundImage = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            };
            preloadImg.src = imageUrl;
        }
    });
}

/**
 * Alternative: Load images from local assets
 * Place images in assets/parallax/ folder
 */
function loadLocalParallaxImages() {
    const parallaxImages = document.querySelectorAll('.parallax-bg-img');
    
    const localImagePaths = [
        'assets/parallax/layer1.png',
        'assets/parallax/layer2.png',
        'assets/parallax/layer3.png',
        'assets/parallax/layer4.png',
        'assets/parallax/layer5.png'
    ];
    
    parallaxImages.forEach((img, index) => {
        const imagePath = localImagePaths[index % localImagePaths.length];
        
        // Directly set the background image without preloading
        img.style.backgroundImage = `url('${imagePath}')`;
        img.style.backgroundSize = 'cover';
        img.style.backgroundPosition = 'center';
        img.classList.add('animate');
        
        console.log(`Loading parallax image ${index + 1}: ${imagePath}`);
    });
}

/**
 * Generate random gradients for parallax layers
 * No external images needed - uses pure CSS gradients
 */
function generateGradientParallaxImages() {
    const parallaxImages = document.querySelectorAll('.parallax-bg-img');
    const gradients = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        'linear-gradient(45deg, #f093fb 0%, #f5576c 50%, #667eea 100%)',
        'linear-gradient(90deg, #4facfe 0%, #00f2fe 50%, #667eea 100%)',
        'linear-gradient(135deg, #764ba2 0%, #f093fb 50%, #4facfe 100%)',
        'linear-gradient(45deg, #f5576c 0%, #667eea 50%, #00f2fe 100%)'
    ];
    
    parallaxImages.forEach((img, index) => {
        const gradient = gradients[index % gradients.length];
        img.style.background = gradient;
        img.classList.add('animate');
    });
}

// Initialize parallax images on page load
document.addEventListener('DOMContentLoaded', () => {
    // Choose one of these methods:
    
    // Option 1: Use embedded SVG gradients (already in HTML) - NO SETUP NEEDED
    
    // Option 2: Load from Unsplash (free, no registration needed)
    // Uncomment the line below to use external images
    // loadParallaxImages();
    
    // Option 3: Load from local assets folder (CURRENTLY ACTIVE)
    // Your Gemini-generated images are loaded from assets/parallax/
    loadLocalParallaxImages();
    
    // Option 4: Generate random gradients (default - already working)
    // generateGradientParallaxImages();
});

// ============================================================
// PARALLAX CONFIGURATION & DOCUMENTATION
// ============================================================

/**
 * PARALLAX SCROLL ANIMATION - IMAGE & SETUP GUIDE
 * 
 * The parallax section is already set up with 5 beautiful gradient layers
 * that animate as you scroll. Here are your options:
 * 
 * OPTION 1: Keep Current SVG Gradients (DEFAULT)
 * ✓ Already working - no setup needed
 * ✓ Beautiful, smooth gradients
 * ✓ No external dependencies
 * ✓ Best for performance
 * 
 * OPTION 2: Use Free External Images (Unsplash)
 * - Uncomment: loadParallaxImages() in the DOMContentLoaded event
 * - No registration needed
 * - High-quality images
 * - Free to use commercially
 * - Supported URLs:
 *   • Mountain: unsplash.com/photos/...
 *   • Space: unsplash.com/photos/...
 *   • Gradients: unsplash.com/photos/...
 *   • Ocean: unsplash.com/photos/...
 *   • Sunset: unsplash.com/photos/...
 * 
 * OPTION 3: Use Local Images
 * 1. Create folder: assets/parallax/
 * 2. Add 5 images (1200x600px recommended):
 *    - layer1.jpg
 *    - layer2.jpg
 *    - layer3.jpg
 *    - layer4.jpg
 *    - layer5.jpg
 * 3. Uncomment: loadLocalParallaxImages()
 * 4. Best image sizes for parallax:
 *    • Desktop: 1200x600px or higher
 *    • Mobile: 800x400px
 *    • Format: JPG (best compression), PNG, WebP
 * 
 * OPTION 4: Generate Random Gradients
 * - Uncomment: generateGradientParallaxImages()
 * - Creates unique, colorful gradients
 * - No external files needed
 * 
 * RECOMMENDED SETUP:
 * For best results, use local images with these characteristics:
 * 
 * 1. Color Palette: Complementary colors for smooth transitions
 * 2. Aspect Ratio: 2:1 (width:height) - e.g., 1200x600px
 * 3. File Size: <200KB per image for fast loading
 * 4. Quality: High resolution (1920x960px) for Retina displays
 * 5. Content: Abstract/landscape works best for parallax
 * 
 * FREE IMAGE RESOURCES:
 * • Unsplash: https://unsplash.com
 * • Pexels: https://www.pexels.com
 * • Pixabay: https://pixabay.com
 * • Gradient Art: https://www.colordot.it/
 * 
 * PARALLAX EFFECT EXPLANATION:
 * Each layer has a different speed (data-speed attribute):
 * - Layer 1: 0.3 (slowest - far back)
 * - Layer 2: 0.5
 * - Layer 3: 0.7
 * - Layer 4: 0.2 (very slow)
 * - Layer 5: 0.4
 * 
 * This creates a 3D depth effect as you scroll!
 */
