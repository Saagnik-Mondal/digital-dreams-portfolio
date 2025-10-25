// WebGL Fluid Effects and Advanced Interactions
class FluidEffect {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0, vx: 0, vy: 0, prevX: 0, prevY: 0 };
        this.frame = 0;
        
        this.resize();
        this.init();
        this.animate();
        this.addEventListeners();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        // Create fluid particles
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.3,
                color: `hsl(${Math.random() * 60 + 280}, 70%, 60%)`,
                life: Math.random() * 100
            });
        }
    }
    
    addEventListeners() {
        window.addEventListener('mousemove', (e) => {
            this.mouse.prevX = this.mouse.x;
            this.mouse.prevY = this.mouse.y;
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.mouse.vx = this.mouse.x - this.mouse.prevX;
            this.mouse.vy = this.mouse.y - this.mouse.prevY;
            
            this.addFluidParticle(e.clientX, e.clientY);
        });
        
        window.addEventListener('resize', () => this.resize());
    }
    
    addFluidParticle(x, y) {
        const velocity = Math.sqrt(this.mouse.vx * this.mouse.vx + this.mouse.vy * this.mouse.vy);
        
        if (velocity > 2) {
            for (let i = 0; i < 3; i++) {
                this.particles.push({
                    x: x + (Math.random() - 0.5) * 20,
                    y: y + (Math.random() - 0.5) * 20,
                    vx: this.mouse.vx * 0.1 + (Math.random() - 0.5) * 2,
                    vy: this.mouse.vy * 0.1 + (Math.random() - 0.5) * 2,
                    size: Math.random() * 4 + 2,
                    opacity: 1,
                    color: `hsl(${Math.random() * 60 + 280}, 70%, 60%)`,
                    life: 0,
                    maxLife: 120
                });
            }
        }
    }
    
    animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.frame++;
        
        // Update particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            
            // Update position
            p.x += p.vx;
            p.y += p.vy;
            
            // Apply physics
            p.vx *= 0.99;
            p.vy *= 0.99;
            p.vy += 0.01; // gravity
            
            // Update life
            if (p.maxLife) {
                p.life++;
                p.opacity = 1 - (p.life / p.maxLife);
                p.size *= 0.99;
            } else {
                p.life += 0.5;
                p.opacity = 0.3 + Math.sin(p.life * 0.02) * 0.2;
            }
            
            // Mouse interaction
            const dx = this.mouse.x - p.x;
            const dy = this.mouse.y - p.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                p.vx += dx * force * 0.01;
                p.vy += dy * force * 0.01;
            }
            
            // Boundary conditions
            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -0.8;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -0.8;
            
            // Remove dead particles
            if ((p.maxLife && p.life > p.maxLife) || p.size < 0.1) {
                this.particles.splice(i, 1);
                continue;
            }
            
            // Draw particle
            this.ctx.globalAlpha = p.opacity;
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Draw connections
            for (let j = i + 1; j < this.particles.length; j++) {
                const p2 = this.particles[j];
                const dx2 = p.x - p2.x;
                const dy2 = p.y - p2.y;
                const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2);
                
                if (dist < 50) {
                    this.ctx.globalAlpha = (1 - dist / 50) * 0.3;
                    this.ctx.strokeStyle = p.color;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }
        }
        
        this.ctx.globalAlpha = 1;
        requestAnimationFrame(() => this.animate());
    }
}

// Three.js 3D Background
class ThreeJSBackground {
    constructor(container) {
        this.container = container;
        this.mouse = new THREE.Vector2();
        this.mouseTarget = new THREE.Vector2();
        
        this.init();
        this.addEventListeners();
        this.animate();
    }
    
    init() {
        // Scene, Camera, Renderer
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0);
        this.container.appendChild(this.renderer.domElement);
        
        // Create geometries
        this.createGeometry();
        
        // Position camera
        this.camera.position.z = 5;
    }
    
    createGeometry() {
        // Floating spheres
        this.spheres = [];
        for (let i = 0; i < 20; i++) {
            const geometry = new THREE.SphereGeometry(0.1, 16, 16);
            const material = new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(Math.random(), 0.7, 0.5),
                transparent: true,
                opacity: 0.6
            });
            
            const sphere = new THREE.Mesh(geometry, material);
            sphere.position.set(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10
            );
            
            sphere.velocity = new THREE.Vector3(
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02
            );
            
            this.spheres.push(sphere);
            this.scene.add(sphere);
        }
        
        // Create wireframe torus
        const torusGeometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
        const torusMaterial = new THREE.MeshBasicMaterial({
            color: 0x667eea,
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });
        this.torus = new THREE.Mesh(torusGeometry, torusMaterial);
        this.scene.add(this.torus);
    }
    
    addEventListeners() {
        window.addEventListener('mousemove', (e) => {
            this.mouseTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouseTarget.y = -(e.clientY / window.innerHeight) * 2 + 1;
        });
        
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
    
    animate() {
        // Smooth mouse following
        this.mouse.lerp(this.mouseTarget, 0.02);
        
        // Rotate torus
        this.torus.rotation.x += 0.01;
        this.torus.rotation.y += 0.01;
        
        // Mouse interaction with torus
        this.torus.position.x = this.mouse.x * 0.5;
        this.torus.position.y = this.mouse.y * 0.5;
        
        // Update spheres
        this.spheres.forEach(sphere => {
            sphere.position.add(sphere.velocity);
            
            // Boundary check
            if (sphere.position.x > 5 || sphere.position.x < -5) sphere.velocity.x *= -1;
            if (sphere.position.y > 5 || sphere.position.y < -5) sphere.velocity.y *= -1;
            if (sphere.position.z > 5 || sphere.position.z < -5) sphere.velocity.z *= -1;
            
            // Mouse attraction
            const distance = sphere.position.distanceTo(new THREE.Vector3(this.mouse.x * 5, this.mouse.y * 5, 0));
            if (distance < 2) {
                const force = (2 - distance) / 2;
                sphere.velocity.lerp(
                    new THREE.Vector3(this.mouse.x * 5, this.mouse.y * 5, 0).sub(sphere.position).normalize().multiplyScalar(0.01),
                    force * 0.1
                );
            }
            
            sphere.rotation.x += 0.01;
            sphere.rotation.y += 0.01;
        });
        
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.animate());
    }
}

// Advanced Cursor with Liquid Trail
class LiquidCursor {
    constructor() {
        this.trails = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.addTrail(e.clientX, e.clientY);
        });
    }
    
    addTrail(x, y) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        document.body.appendChild(trail);
        
        // Remove after animation
        setTimeout(() => {
            if (trail.parentNode) {
                trail.parentNode.removeChild(trail);
            }
        }, 800);
    }
}

// Smooth Scroll with Lenis
class SmoothScroll {
    constructor() {
        this.lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });
        
        this.init();
    }
    
    init() {
        // Register GSAP ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);
        
        this.lenis.on('scroll', ScrollTrigger.update);
        
        gsap.ticker.add((time) => {
            this.lenis.raf(time * 1000);
        });
        
        gsap.ticker.lagSmoothing(0);
    }
}

// Enhanced Parallax Scroll Manager
class ParallaxScrollManager {
    constructor() {
        this.elements = [];
        this.isScrolling = false;
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.registerElements();
    }
    
    bindEvents() {
        window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
        window.addEventListener('resize', this.handleResize.bind(this));
    }
    
    registerElements() {
        // Register different types of parallax elements
        this.registerElement('.hero-background', { speed: 0.5, direction: 'up' });
        this.registerElement('.parallax-shape', { speed: 0.3, direction: 'down' });
        this.registerElement('.portfolio-card', { speed: 0.1, direction: 'up' });
        this.registerElement('.section-title', { speed: 0.2, direction: 'up' });
    }
    
    registerElement(selector, options = {}) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            this.elements.push({
                element,
                speed: options.speed || 0.1,
                direction: options.direction || 'up',
                offset: options.offset || 0,
                index
            });
        });
    }
    
    handleScroll() {
        if (!this.isScrolling) {
            requestAnimationFrame(this.updateElements.bind(this));
            this.isScrolling = true;
        }
    }
    
    updateElements() {
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        this.elements.forEach(({ element, speed, direction, offset, index }) => {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + scrollY;
            const elementHeight = rect.height;
            
            // Check if element is in viewport
            if (rect.bottom >= 0 && rect.top <= windowHeight) {
                const progress = (scrollY - elementTop + windowHeight) / (windowHeight + elementHeight);
                const clampedProgress = Math.max(0, Math.min(1, progress));
                
                let translateY = 0;
                if (direction === 'up') {
                    translateY = (clampedProgress - 0.5) * speed * 100;
                } else {
                    translateY = -(clampedProgress - 0.5) * speed * 100;
                }
                
                // Add some variation based on index
                const variation = Math.sin(index * 0.5) * 10;
                translateY += variation;
                
                element.style.transform = `translate3d(0, ${translateY + offset}px, 0)`;
            }
        });
        
        this.isScrolling = false;
    }
    
    handleResize() {
        // Recalculate on resize
        this.updateElements();
    }
}

// Enhanced Mouse Parallax Effect
class MouseParallaxEffect {
    constructor() {
        this.mouse = { x: 0, y: 0 };
        this.elements = [];
        this.init();
    }
    
    init() {
        this.registerElements();
        this.bindEvents();
    }
    
    registerElements() {
        // Register elements for mouse parallax
        const shapes = document.querySelectorAll('.parallax-shape');
        const floatingElements = document.querySelectorAll('.floating-element');
        
        shapes.forEach((element, index) => {
            this.elements.push({
                element,
                intensity: 20 + (index * 5),
                speed: 0.1 + (index * 0.02)
            });
        });
        
        floatingElements.forEach((element, index) => {
            this.elements.push({
                element,
                intensity: 15 + (index * 3),
                speed: 0.08 + (index * 0.01)
            });
        });
    }
    
    bindEvents() {
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    }
    
    handleMouseMove(e) {
        this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
        
        this.updateElements();
    }
    
    updateElements() {
        this.elements.forEach(({ element, intensity, speed }) => {
            const x = this.mouse.x * intensity;
            const y = this.mouse.y * intensity;
            
            // Smooth transition
            const currentTransform = element.style.transform || '';
            const newTransform = `translate3d(${x}px, ${y}px, 0)`;
            
            element.style.transition = `transform ${speed}s ease-out`;
            element.style.transform = newTransform;
        });
    }
}

// Initialize all effects
let fluidEffect, threeJSBackground, liquidCursor, smoothScroll, parallaxScrollManager, mouseParallaxEffect;

function initAdvancedEffects() {
    // Skip heavy effects on mobile
    if (window.innerWidth < 768) return;
    
    // Initialize fluid canvas
    const fluidCanvas = document.getElementById('fluid-canvas');
    if (fluidCanvas) {
        fluidEffect = new FluidEffect(fluidCanvas);
    }
    
    // Initialize Three.js background
    const webglContainer = document.getElementById('webgl-container');
    if (webglContainer && typeof THREE !== 'undefined') {
        threeJSBackground = new ThreeJSBackground(webglContainer);
    }
    
    // Initialize liquid cursor
    liquidCursor = new LiquidCursor();
    
    // Initialize smooth scroll
    if (typeof Lenis !== 'undefined') {
        smoothScroll = new SmoothScroll();
    }
    
    // Initialize enhanced parallax effects
    parallaxScrollManager = new ParallaxScrollManager();
    mouseParallaxEffect = new MouseParallaxEffect();
}

// Export for use in main script
if (typeof window !== 'undefined') {
    window.initAdvancedEffects = initAdvancedEffects;
}