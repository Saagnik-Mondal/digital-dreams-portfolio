// Global Variables
let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Advanced Visual Context Awareness System
window.visualContext = {
    currentSection: null,
    currentArtwork: null,
    lastViewedItem: null,
    viewingHistory: [],
    isViewingModal: false,
    attentionFocus: null, // What the user is actually focused on
    viewportCenter: { x: 0, y: 0 },
    lastIntentionalAction: null,
    hoverStartTime: null,
    sustainedAttentionThreshold: 2000, // 2 seconds of sustained attention
    contextConfidence: 0 // 0-1 scale of how confident we are about current context
};

console.log('Script loaded successfully! Mobile device:', isMobile);

// Global error handler
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    alert('JavaScript Error: ' + e.error.message);
});

// Platform detection for screen vision capabilities
function detectPlatform() {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;

    const platforms = {
        isWindows: platform.includes('Win'),
        isMac: platform.includes('Mac'),
        isAndroid: /Android/i.test(userAgent),
        isIOS: /iPad|iPhone|iPod/.test(userAgent) || (platform === 'MacIntel' && navigator.maxTouchPoints > 1),
        isLinux: platform.includes('Linux'),
        isMobile: /Mobi|Android/i.test(userAgent)
    };

    // Screen vision is supported on Windows, Mac, and Android (excluding iOS)
    platforms.supportsScreenVision = (platforms.isWindows || platforms.isMac || platforms.isAndroid) && !platforms.isIOS;

    console.log('📱 Platform Detection:', platforms);
    return platforms;
}

// Global platform info
window.platformInfo = detectPlatform();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing AI portfolio...');

    // Force show content after 15 seconds as ultimate fallback
    setTimeout(() => {
        console.log('Ultimate fallback: forcing content visibility...');
        window.forceShowContent();
    }, 15000);

    initializeWebsite();
});

// AI Loading Screen
function setupAILoadingScreen() {
    console.log('Setting up AI loading screen...');
    const loadingScreen = document.getElementById('ai-loading-screen');
    const progressFill = document.querySelector('.progress-circle-fill');
    const progressPercentage = document.querySelector('.progress-percentage');
    const stages = document.querySelectorAll('.stage');

    if (!loadingScreen) {
        console.error('AI loading screen not found!');
        startMainExperience();
        return;
    }

    console.log('AI loading screen found, starting animation...');

    // Allow user to skip loading by clicking
    loadingScreen.addEventListener('click', () => {
        console.log('User clicked loading screen, skipping to main experience...');
        loadingScreen.style.display = 'none';
        startMainExperience();
        setupCustomCursor();
        setupAIChatbot();
    });

    // Fallback timeout in case loading gets stuck
    setTimeout(() => {
        if (loadingScreen.style.display !== 'none') {
            console.log('Loading timeout reached, starting main experience...');
            loadingScreen.style.display = 'none';
            startMainExperience();
            setupCustomCursor();
            setupAIChatbot();
        }
    }, 8000); // 8 second fallback

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
                // Loading complete - ensure it happens
                console.log('All loading stages complete, transitioning...');
                setTimeout(() => {
                    loadingScreen.style.opacity = '0';
                    loadingScreen.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        console.log('Loading complete, starting main experience...');
                        loadingScreen.style.display = 'none';
                        loadingScreen.style.visibility = 'hidden';
                        startMainExperience();
                        setupCustomCursor();
                        setupAIChatbot();
                    }, 500); // Reduced from 800ms
                }, 500); // Reduced from 1000ms
            }
        }
    }

    setTimeout(nextStage, 500);
}

// AI Chatbot
function setupAIChatbot() {
    console.log('=== SETTING UP AI CHATBOT ===');
    const chatbot = document.getElementById('ai-chatbot');
    const toggle = document.querySelector('.chatbot-toggle');
    const windowEl = document.querySelector('.chatbot-window');
    const closeBtn = document.querySelector('.chatbot-close');
    const input = document.querySelector('.chat-input');
    const sendBtn = document.querySelector('.send-btn');
    const messages = document.querySelector('.chatbot-messages');

    console.log('Chatbot elements found:', {
        chatbot: !!chatbot,
        toggle: !!toggle,
        windowEl: !!windowEl,
        closeBtn: !!closeBtn,
        input: !!input,
        sendBtn: !!sendBtn,
        messages: !!messages
    });

    if (!chatbot) {
        console.error('Chatbot container not found!');
        return;
    }

    if (!toggle) {
        console.error('Chatbot toggle not found!');
        return;
    }

    if (!windowEl) {
        console.error('Chatbot window not found!');
        return;
    }

    if (!input) {
        console.error('Chatbot input not found!');
        return;
    }

    if (!sendBtn) {
        console.error('Send button not found!');
        return;
    }

    if (!messages) {
        console.error('Messages container not found!');
        return;
    }

    // Make sure chatbot is visible
    chatbot.style.display = 'block';
    chatbot.style.visibility = 'visible';

    let isOpen = false;

    toggle.addEventListener('click', () => {
        console.log('Chatbot toggle clicked');
        isOpen = !isOpen;
        windowEl.style.display = isOpen ? 'flex' : 'none';
        toggle.style.transform = isOpen ? 'scale(0.9)' : 'scale(1)';
        console.log('Chatbot window display:', windowEl.style.display);
    });

    closeBtn.addEventListener('click', () => {
        console.log('Chatbot close clicked');
        isOpen = false;
        windowEl.style.display = 'none';
        toggle.style.transform = 'scale(1)';
    });

    function sendMessage(message, isUser = false) {
        if (isUser) {
            // User message - display immediately
            const messageDiv = document.createElement('div');
            messageDiv.className = `message user-message`;

            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="message-content">
                    <p>${message}</p>
                    <div class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                </div>
            `;

            messages.appendChild(messageDiv);
            messages.scrollTop = messages.scrollHeight;
        } else {
            // AI message - use typing effect
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ai-message`;

            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-brain"></i>
                </div>
                <div class="message-content">
                    <p></p>
                    <div class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                </div>
            `;

            messages.appendChild(messageDiv);
            messages.scrollTop = messages.scrollHeight;

            addTypingEffect(message, () => {
                // Typing complete
            });
        }
    }

    function handleSend() {
        const message = input.value.trim();
        console.log('handleSend called with message:', message);
        if (message) {
            sendMessage(message, true);
            input.value = '';

            // Show typing indicator
            const typingDiv = document.createElement('div');
            typingDiv.className = 'message ai-message typing-indicator';
            typingDiv.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-brain"></i>
                </div>
                <div class="message-content">
                    <div class="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            `;
            messages.appendChild(typingDiv);
            messages.scrollTop = messages.scrollHeight;

            // Process response after delay
            setTimeout(() => {
                // Remove typing indicator
                const typingIndicator = document.querySelector('.typing-indicator');
                if (typingIndicator) {
                    typingIndicator.remove();
                }

                // Advanced NLP Processing
                const lowerMessage = message.toLowerCase();
                console.log('User message:', message);
                console.log('Processing with NLP...');

                // NLP Intent Recognition
                const intents = {
                    greeting: {
                        patterns: [
                            /\b(hi|hello|hey|namaste|greetings|good\s+(morning|afternoon|evening)|howdy|hola|salam|bonjour|ciao)\b/i,
                            /\b(what'?s up|sup|yo|hai)\b/i,
                            /\b(start|begin|initiate)\b.*\b(conversation|chat|talk)\b/i
                        ],
                        responses: [
                            "Namaste! I am Ronica, your intelligent creative assistant. I've analyzed this portfolio extensively and am prepared to provide detailed insights into each creative endeavor. How may I be of assistance?",
                            "Greetings! I'm Ronica, designed to help you explore this beautiful portfolio. What would you like to know about the artist's work?",
                            "Hello there! I'm Ronica, your AI guide through this digital art collection. How can I help you today?"
                        ]
                    },

                    about_artist: {
                        patterns: [
                            /\b(about|tell me about|who is|artist|creator|background|experience|bio|biography|profile)\b/i,
                            /\b(how long|years|experience|skilled|expert)\b/i,
                            /\b(what.*do|specializes|focus|work)\b/i
                        ],
                        responses: [
                            "Ah, the artist's background. This creator is a true maestro of digital craftsmanship with over five years of experience in visual storytelling. Their work beautifully blends traditional Indian aesthetics with modern digital techniques. The emotional depth and cultural sensitivity in their art is quite remarkable.",
                            "This talented artist brings five years of experience in digital art, seamlessly merging Indian cultural heritage with contemporary design. Their work tells stories that resonate deeply with audiences worldwide.",
                            "The creator behind this portfolio is a skilled digital artist with extensive experience in visual storytelling, combining traditional Indian art forms with modern digital techniques."
                        ]
                    },

                    animations: {
                        patterns: [
                            /\b(animation|animations|animated|motion|moving|video|film|cinematic)\b/i,
                            /\b(divine dance|mystic forest|cosmic mandala|dance|forest|mandala)\b/i,
                            /\b(show.*animation|see.*animation|what.*animation)\b/i
                        ],
                        responses: [
                            'The animations section features three remarkable pieces: "Divine Dance" - a Kathakali-inspired 3D character animation, "Mystic Forest" - an interactive forest with mythical creatures from Indian folklore, and "Cosmic Mandala" - an abstract exploration of the universe through traditional mandala patterns. Each demonstrates the beautiful fusion of cultural heritage and cutting-edge technology.',
                            'Let me show you the animated works: "Divine Dance" brings traditional Kathakali dance to life in 3D, "Mystic Forest" features interactive mythical creatures from Indian folklore, and "Cosmic Mandala" explores universal patterns through mesmerizing motion graphics.',
                            'The animation collection includes: Kathakali-inspired character animation, interactive forest scenes with folklore elements, and abstract mandala explorations. Would you like me to elaborate on any specific piece?'
                        ]
                    },

                    illustrations: {
                        patterns: [
                            /\b(illustration|illustrations|digital.*art|painting|drawing|graphic|design)\b/i,
                            /\b(sacred waters|goddess awakening|urban mandala|water|goddess|urban)\b/i,
                            /\b(show.*illustration|see.*illustration|what.*illustration)\b/i
                        ],
                        responses: [
                            'The illustrations showcase three beautiful pieces: "Sacred Waters" - a photorealistic digital painting of the Ganges at dawn, "Goddess Awakening" - a contemporary interpretation of Durga blending traditional iconography with modern aesthetics, and "Urban Mandala" - a geometric design incorporating Mumbai\'s architecture. Each piece tells a unique story of cultural fusion.',
                            'The digital illustrations include: A serene depiction of the sacred Ganges river, a modern take on Goddess Durga awakening, and an urban mandala inspired by Mumbai\'s architecture. These pieces beautifully merge tradition with contemporary digital art.',
                            'You\'ll find stunning digital illustrations featuring sacred waters of the Ganges, a contemporary goddess interpretation, and urban mandala designs. Each artwork carries deep cultural significance while embracing modern aesthetics.'
                        ]
                    },

                    drawings: {
                        patterns: [
                            /\b(drawing|drawings|sketch|sketches|charcoal|ink|pencil|traditional)\b/i,
                            /\b(charcoal portrait|ink mandala|urban sketch|portrait|mandala|sketch)\b/i,
                            /\b(show.*drawing|see.*drawing|what.*drawing)\b/i
                        ],
                        responses: [
                            'The drawings section includes "Charcoal Portrait" - an intimate study using traditional charcoal techniques, "Ink Mandala" - an intricate mandala design created with dip pen and ink exploring spiritual geometry, and "Urban Sketch" - a mixed media capture of Mumbai street life. These pieces showcase the artist\'s foundation in classical techniques with contemporary vision.',
                            'The traditional drawing collection features: A charcoal portrait capturing human emotion, an intricate ink mandala with spiritual geometry, and an urban sketch of Mumbai street life using mixed media techniques.',
                            'These classical drawings demonstrate mastery of traditional techniques: charcoal portraiture, dip pen mandala art, and mixed media urban sketching. Each piece reflects the artist\'s deep understanding of both traditional and contemporary approaches.'
                        ]
                    },

                    workflow: {
                        patterns: [
                            /\b(workflow|process|how.*work|steps|method|approach|creative.*process)\b/i,
                            /\b(create|make|design|develop|produce)\b/i,
                            /\b(technique|method|approach|way)\b/i
                        ],
                        responses: [
                            'The creative process follows a beautifully structured approach: conceptualization sparks the vision, research provides depth, digital creation brings it to life, and refinement ensures perfection. Each phase is executed with the precision and artistic integrity that reflects our cultural values.',
                            'The workflow involves four key phases: 1) Conceptualization - developing the core idea, 2) Research - gathering inspiration and cultural references, 3) Digital Creation - bringing concepts to life using modern tools, and 4) Refinement - perfecting every detail.',
                            'This artist follows a systematic creative process: starting with conceptualization, moving through research and development, executing with digital precision, and finishing with meticulous refinement. Each step honors both tradition and innovation.'
                        ]
                    },

                    contact: {
                        patterns: [
                            /\b(contact|email|phone|reach|hire|work|collaborate|project|commission)\b/i,
                            /\b(get.*touch|connect|message|call|write)\b/i,
                            /\b(work.*with|hire.*artist|commission.*art)\b/i
                        ],
                        responses: [
                            'Most certainly. The artist welcomes professional inquiries and creative collaborations with great enthusiasm. I suggest reaching out to discuss potential projects - their expertise in blending traditional Indian aesthetics with modern digital art would be invaluable to any endeavor.',
                            'I\'d be happy to help you connect! The artist is always excited about new creative collaborations. You can reach out via email or phone to discuss your project ideas. Their unique blend of traditional and modern techniques could be perfect for your vision.',
                            'Wonderful! The artist loves working on meaningful projects. Feel free to reach out for collaborations, commissions, or professional inquiries. Their expertise in cultural fusion and digital art makes them an excellent partner for creative endeavors.'
                        ]
                    },

                    appreciation: {
                        patterns: [
                            /\b(amazing|beautiful|wonderful|great|awesome|love|like|impressed|stunning|brilliant)\b/i,
                            /\b(thank|thanks|appreciate|grateful)\b/i,
                            /\b(good|nice|excellent|fantastic|superb)\b/i
                        ],
                        responses: [
                            'Thank you for your kind words! I\'m delighted that you appreciate the artistry and cultural depth in this portfolio. The creator pours their heart and soul into each piece, honoring both tradition and innovation.',
                            'Your appreciation means a lot! This portfolio represents the beautiful marriage of ancient Indian wisdom and modern digital craftsmanship. Each piece tells a story that transcends time and culture.',
                            'I\'m touched by your positive feedback! The artist\'s work is indeed special - a harmonious blend of traditional Indian aesthetics with contemporary digital techniques that creates something truly unique and meaningful.'
                        ]
                    },

                    questions: {
                        patterns: [
                            /\b(what|how|when|where|why|who|which|whose)\b.*\?/i,
                            /\b(tell me|explain|describe|show me)\b/i,
                            /\b(can you|could you|would you)\b/i
                        ],
                        responses: [
                            'I\'d be happy to help answer your questions! Feel free to ask about the artist\'s background, specific artworks, creative process, or how to get in touch for collaborations.',
                            'Great question! I have detailed information about the portfolio, the artist\'s journey, and the creative process behind each piece. What specifically would you like to know?',
                            'I\'m here to provide comprehensive insights into this creative portfolio. Whether you want to know about the artworks, the artist, or the creative process, I\'m ready to share detailed information.'
                        ]
                    },

                    specific_artwork: {
                        patterns: [
                            /\b(divine dance|mystic forest|cosmic mandala|sacred waters|goddess awakening|urban mandala|charcoal portrait|ink mandala|urban sketch)\b/i,
                            /\b(tell me about|show me|what about|more about)\b.*\b(dance|forest|mandala|water|goddess|portrait|sketch)\b/i,
                            /\b(this|that|current|viewing|looking at|seeing)\b.*\b(picture|image|artwork|piece|work)\b/i,
                            /\b(what.*this|what.*that|details about|tell me about this|what is this)\b/i
                        ],
                        responses: [
                            'I\'d be delighted to share more about that specific piece! Each artwork has its own unique story and cultural significance. Which particular artwork caught your attention?',
                            'Wonderful choice! That piece represents a beautiful fusion of traditional Indian elements with modern digital techniques. Would you like me to elaborate on its creation process or cultural inspiration?',
                            'Excellent selection! That artwork showcases the artist\'s mastery in blending ancient wisdom with contemporary aesthetics. I can tell you about the techniques used, the inspiration behind it, or how it fits into the overall portfolio vision.'
                        ]
                    },

                    current_view: {
                        patterns: [
                            /\b(this|that|current|now|here|viewing|looking)\b/i,
                            /\b(what.*see|what.*this|what.*showing|what.*display)\b/i,
                            /\b(explain|describe|about this|this is|this artwork)\b/i
                        ],
                        responses: [
                            'Based on what I can see you\'re currently viewing, this appears to be a beautiful piece from the portfolio. Could you be more specific about which aspect you\'d like me to explain?',
                            'I\'m detecting that you\'re looking at something specific. To give you the most accurate information, could you tell me which artwork or section has caught your attention?',
                            'I can see you\'re engaged with the portfolio content. To provide the most helpful response, could you let me know which particular piece or section you\'re referring to?'
                        ]
                    },

                    technical_questions: {
                        patterns: [
                            /\b(software|tools|programs|photoshop|blender|after effects|cinema 4d|procreate|illustrator)\b/i,
                            /\b(how.*made|what.*used|technique|method|process|create)\b/i,
                            /\b(digital|3d|animation|render|effects)\b/i
                        ],
                        responses: [
                            'The artist employs a sophisticated toolkit including Adobe Creative Suite (Photoshop, Illustrator, After Effects), Blender for 3D work, Cinema 4D for motion graphics, and Procreate for digital painting. Each tool is chosen specifically for the creative vision of each piece.',
                            'Technically speaking, this portfolio showcases expertise in multiple digital mediums: 2D/3D animation, digital painting, vector illustration, and motion graphics. The artist adapts their technical approach to best serve each creative concept.',
                            'The technical craftsmanship is impressive - combining traditional artistic principles with cutting-edge digital tools. From charcoal studies to complex 3D animations, each piece demonstrates deep technical proficiency and artistic vision.'
                        ]
                    },

                    cultural_questions: {
                        patterns: [
                            /\b(culture|cultural|indian|tradition|traditional|folklore|mythology|hindu|spiritual|sacred)\b/i,
                            /\b(kathakali|durga|ganges|mandala|mythical|folklore|spiritual)\b/i,
                            /\b(indian.*art|traditional.*indian|cultural.*fusion)\b/i
                        ],
                        responses: [
                            'The cultural depth in this portfolio is truly remarkable. Each piece honors Indian traditions while embracing modern expression. The artist beautifully weaves ancient wisdom with contemporary digital techniques, creating work that resonates across cultures and generations.',
                            'Culturally, this portfolio represents a bridge between India\'s rich artistic heritage and modern digital innovation. From Kathakali dance forms to sacred mandala geometry, each piece carries deep cultural significance while speaking to universal themes.',
                            'The cultural fusion is what makes this work so special. Traditional Indian motifs, spiritual symbolism, and classical techniques are reimagined through digital mediums, creating contemporary art that honors ancient wisdom while embracing modern aesthetics.'
                        ]
                    }
                };

                // Sentiment Analysis
                const positiveWords = ['amazing', 'beautiful', 'wonderful', 'great', 'awesome', 'love', 'like', 'impressed', 'stunning', 'brilliant', 'excellent', 'fantastic', 'superb', 'incredible', 'magnificent', 'spectacular'];
                const questionWords = ['what', 'how', 'when', 'where', 'why', 'who', 'which', 'whose', 'can', 'could', 'would', 'do', 'does', 'is', 'are', 'tell', 'show', 'explain'];

                const hasPositiveSentiment = positiveWords.some(word => lowerMessage.includes(word));
                const isQuestion = questionWords.some(word => lowerMessage.includes(word)) || lowerMessage.includes('?');

                console.log('Sentiment analysis:', { hasPositiveSentiment, isQuestion });

                // Advanced NLP Processing
                let bestMatch = { intent: null, confidence: 0, response: null };

                for (const [intentName, intentData] of Object.entries(intents)) {
                    for (const pattern of intentData.patterns) {
                        const matches = message.match(pattern);
                        if (matches) {
                            const confidence = matches.length / message.split(' ').length; // Simple confidence score
                            if (confidence > bestMatch.confidence) {
                                bestMatch = {
                                    intent: intentName,
                                    confidence: confidence,
                                    response: intentData.responses[Math.floor(Math.random() * intentData.responses.length)]
                                };
                            }
                        }
                    }
                }

                // Visual context-aware responses
                let response;
                if (bestMatch.response) {
                    response = bestMatch.response;
                } else if (bestMatch.intent === 'current_view') {
                    // Prioritize screen vision analysis if available and recent
                    if (window.screenVision && window.screenVision.lastAnalysis &&
                        Date.now() - (window.screenVision.lastAnalysis.timestamp || 0) < 5000) {
                        const analysis = window.screenVision.lastAnalysis;
                        if (analysis.artwork && analysis.artwork !== 'Unknown Artwork') {
                            const artworkDetails = getArtworkDetails(analysis.artwork);
                            response = `👁️ I can see you're looking at "${analysis.artwork}"! ${artworkDetails.description} This piece was created using ${artworkDetails.technique} and represents ${artworkDetails.theme}. Would you like to know more about the creative process, cultural inspiration, or technical aspects?`;
                        } else if (analysis.section) {
                            response = `👁️ I can see you're in the ${analysis.section} section. This collection features ${analysis.section === 'animations' ? 'three dynamic motion graphics pieces' : analysis.section === 'illustrations' ? 'three stunning digital illustrations' : analysis.section === 'drawings' ? 'three classical drawing studies' : 'the artist\'s creative workflow'}. Each piece showcases the beautiful fusion of Indian cultural heritage with modern digital techniques. Which specific work interests you?`;
                        }
                    } else if (window.visualContext.currentArtwork) {
                        const artworkDetails = getArtworkDetails(window.visualContext.currentArtwork);
                        response = `Ah, you're looking at "${window.visualContext.currentArtwork}"! ${artworkDetails.description} This piece was created using ${artworkDetails.technique} and represents ${artworkDetails.theme}. Would you like to know more about the creative process, cultural inspiration, or technical aspects?`;
                    } else if (window.visualContext.currentSection) {
                        response = `You're currently in the ${window.visualContext.currentSection} section. This collection features ${window.visualContext.currentSection === 'animations' ? 'three dynamic motion graphics pieces' : window.visualContext.currentSection === 'illustrations' ? 'three stunning digital illustrations' : window.visualContext.currentSection === 'drawings' ? 'three classical drawing studies' : 'the artist\'s creative workflow'}. Each piece showcases the beautiful fusion of Indian cultural heritage with modern digital techniques. Which specific work interests you?`;
                    }
                } else {
                    // Check for screen vision context even without explicit current_view intent
                    if (window.screenVision && window.screenVision.lastAnalysis &&
                        Date.now() - (window.screenVision.lastAnalysis.timestamp || 0) < 5000) {
                        const analysis = window.screenVision.lastAnalysis;
                        if (analysis.artwork && analysis.artwork !== 'Unknown Artwork') {
                            const artworkDetails = getArtworkDetails(analysis.artwork);
                            response = `👁️ I can see you're looking at "${analysis.artwork}". This is a remarkable piece from the ${analysis.section} section. Would you like me to tell you more about its creation, cultural significance, or technical aspects?`;
                        } else if (analysis.section) {
                            response = `👁️ I notice you're exploring the ${analysis.section} section. This collection showcases the artist's mastery in ${analysis.section === 'animations' ? 'motion graphics and 3D animation' : analysis.section === 'illustrations' ? 'digital painting and illustration' : analysis.section === 'drawings' ? 'traditional drawing techniques' : 'creative processes'}. What specific aspect interests you?`;
                        }
                    } else if (window.visualContext.currentArtwork) {
                        const artworkDetails = getArtworkDetails(window.visualContext.currentArtwork);
                        response = `I see you're looking at "${window.visualContext.currentArtwork}". This is a remarkable piece from the ${window.visualContext.currentSection} section. Would you like me to tell you more about its creation, cultural significance, or technical aspects?`;
                    } else if (window.visualContext.currentSection) {
                        response = `I notice you're exploring the ${window.visualContext.currentSection} section. This collection showcases the artist's mastery in ${window.visualContext.currentSection === 'animations' ? 'motion graphics and 3D animation' : window.visualContext.currentSection === 'illustrations' ? 'digital painting and illustration' : window.visualContext.currentSection === 'drawings' ? 'traditional drawing techniques' : 'creative processes'}. What specific aspect interests you?`;
                    }
                }
                }

                // Add contextual suggestions
                if (bestMatch.intent === 'animations') {
                    response += ' Would you like me to tell you more about any specific animation?';
                } else if (bestMatch.intent === 'illustrations') {
                    response += ' Which illustration interests you most?';
                } else if (bestMatch.intent === 'drawings') {
                    response += ' I can share more details about the drawing techniques used.';
                }

                // Initialize conversation and visual context
                if (!window.conversationContext) {
                    window.conversationContext = { lastIntent: null, messageCount: 0, topicsDiscussed: [] };
                }

                if (!window.visualContext) {
                    window.visualContext = {
                        currentSection: null,
                        currentArtwork: null,
                        lastViewedItem: null,
                        viewingHistory: [],
                        isViewingModal: false
                    };
                }

                window.conversationContext.messageCount++;
                window.conversationContext.lastIntent = bestMatch.intent;

                if (bestMatch.intent && !window.conversationContext.topicsDiscussed.includes(bestMatch.intent)) {
                    window.conversationContext.topicsDiscussed.push(bestMatch.intent);
                }

                // Enhanced response processing with personality and context
                if (bestMatch.intent === 'greeting' && window.conversationContext.messageCount === 1) {
                    // First interaction - be extra welcoming with cultural touch
                    response = response.replace('How may I be of assistance?', 'I\'m honored to share insights about this beautiful fusion of Indian tradition and digital innovation. What aspect of the portfolio intrigues you most?');
                }

                // Add enthusiasm for positive sentiment
                if (hasPositiveSentiment && bestMatch.intent) {
                    const enthusiasmPhrases = [
                        ' I\'m delighted you feel that way!',
                        ' Your appreciation warms my digital heart!',
                        ' I\'m thrilled you\'re enjoying the portfolio!',
                        ' Your positive feedback means so much!'
                    ];
                    response += enthusiasmPhrases[Math.floor(Math.random() * enthusiasmPhrases.length)];
                }

                // Handle questions more intelligently
                if (isQuestion && !bestMatch.intent) {
                    response = 'That\'s an excellent question! I have detailed insights about the artist\'s creative process, the cultural influences in their work, and the technical aspects of each piece. Could you be more specific about what you\'d like to know?';
                }

                // Dynamic follow-up suggestions based on conversation flow
                if (window.conversationContext.topicsDiscussed.length >= 2) {
                    const undiscussedTopics = ['animations', 'illustrations', 'drawings', 'workflow'].filter(
                        topic => !window.conversationContext.topicsDiscussed.includes(topic)
                    );
                    if (undiscussedTopics.length > 0) {
                        const suggestions = [
                            ` You might also be interested in learning about the ${undiscussedTopics[0]} section.`,
                            ` Would you like to explore the ${undiscussedTopics[0]} as well?`,
                            ` I also have fascinating insights about the ${undiscussedTopics[0]} if you're curious.`,
                            ` The ${undiscussedTopics[0]} section has some remarkable pieces too!`
                        ];
                        response += suggestions[Math.floor(Math.random() * suggestions.length)];
                    }
                }

                // Add cultural warmth and personality
                if (bestMatch.intent && Math.random() > 0.7) { // 30% chance to add personality
                    const personalityPhrases = [
                        ' 🙏',
                        ' ✨',
                        ' 🌟',
                        ' With great cultural reverence,',
                        ' As they say in Indian tradition,',
                        ' Drawing from ancient wisdom,',
                        ' In the spirit of artistic innovation,'
                    ];
                    response += personalityPhrases[Math.floor(Math.random() * personalityPhrases.length)];
                }

                            console.log(`🎯 Best match: ${bestMatch.intent} (confidence: ${(bestMatch.confidence * 100).toFixed(1)}%)`);
                console.log('💬 Visual context at response time:', window.visualContext);
                console.log('🗣️ Conversation context:', window.conversationContext);
                console.log('📝 Selected response:', response.substring(0, 80) + '...');

                // Debug visual context usage
                if (bestMatch.intent === 'current_view' || lowerMessage.includes('this') || lowerMessage.includes('that')) {
                    console.log('🎨 Using visual context for response');
                }

                sendMessage(response, false);
            }, 1500 + Math.random() * 1000);
        }
    }

    sendBtn.addEventListener('click', () => {
        console.log('Send button clicked');
        handleSend();
    });
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            console.log('Enter key pressed');
            handleSend();
        }
    });

    // Welcome message after a delay
    setTimeout(() => {
        console.log('Sending welcome message...');
        sendMessage('Namaste! I am Ronica, your intelligent creative assistant. I\'ve been designed to help you navigate through this digital portfolio and provide insights into the creative process. How may I assist you today?');
    }, 1000); // Reduced delay

    // Debug context button
    const debugBtn = document.getElementById('debug-context');
    if (debugBtn) {
        debugBtn.addEventListener('click', () => {
            console.log('🔍 Debug button clicked');
            window.debugContext();
            const context = window.visualContext;
            const confidencePercent = Math.round(context.contextConfidence * 100);

            alert(`🎯 Ronica's Attention Focus: ${context.attentionFocus || 'None'}
📍 Current Section: ${context.currentSection || 'None'}
🎨 Current Artwork: ${context.currentArtwork || 'None'}
🎚️ Confidence: ${confidencePercent}%
🔄 Last Action: ${context.lastIntentionalAction || 'None'}
📚 Recent History: ${context.viewingHistory.slice(0, 3).join(', ') || 'None'}

💡 Test: Ask "what is this" to see context-aware response!`);
        });
    }
}

// Dark Mode Toggle
function setupDarkMode() {
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeSwitch.checked = true;
    }

    // Theme toggle functionality
    themeSwitch.addEventListener('change', () => {
        if (themeSwitch.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Typing Effect for Chatbot
function addTypingEffect(message, callback) {
    const typingSpeed = 30; // milliseconds per character
    let index = 0;
    const target = document.querySelector('.chatbot-messages .message:last-child .message-content p');

    if (!target) return callback();

    const text = message;
    target.textContent = '';

    const typeWriter = () => {
        if (index < text.length) {
            target.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            callback();
        }
    };

    typeWriter();
}

// Screen Vision System for Gemini Live-style context tracking
class ScreenVision {
    constructor() {
        this.stream = null;
        this.canvas = null;
        this.context = null;
        this.isActive = false;
        this.analysisInterval = null;
        this.lastAnalysis = null;

        // Analysis settings
        this.analysisIntervalMs = 2000; // Analyze every 2 seconds
        this.maxRetries = 3;
        this.retryDelay = 1000;
    }

    async initialize() {
        if (!window.platformInfo.supportsScreenVision) {
            console.log('📱 Screen vision not supported on this platform');
            return false;
        }

        try {
            // Create canvas for screen capture processing
            this.canvas = document.createElement('canvas');
            this.canvas.width = 1280;
            this.canvas.height = 720;
            this.canvas.style.display = 'none';
            document.body.appendChild(this.canvas);
            this.context = this.canvas.getContext('2d');

            console.log('🎥 Screen vision initialized');
            return true;
        } catch (error) {
            console.error('❌ Failed to initialize screen vision:', error);
            return false;
        }
    }

    async startScreenCapture() {
        if (!window.platformInfo.supportsScreenVision) {
            console.log('📱 Screen vision not available on this platform');
            return false;
        }

        try {
            // Request screen capture permission
            this.stream = await navigator.mediaDevices.getDisplayMedia({
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    frameRate: { ideal: 5, max: 10 } // Low frame rate for analysis
                },
                audio: false
            });

            console.log('📺 Screen capture started');

            // Set up video element for processing
            const video = document.createElement('video');
            video.srcObject = this.stream;
            video.style.display = 'none';
            document.body.appendChild(video);

            video.onloadedmetadata = () => {
                video.play();
                this.startAnalysis(video);
            };

            return true;
        } catch (error) {
            console.error('❌ Screen capture failed:', error);
            return false;
        }
    }

    startAnalysis(video) {
        this.isActive = true;

        this.analysisInterval = setInterval(async () => {
            if (!this.isActive) return;

            try {
                // Capture current frame
                this.context.drawImage(video, 0, 0, this.canvas.width, this.canvas.height);

                // Analyze locally without API
                const analysis = await this.analyzeScreenLocally(this.canvas);

                if (analysis) {
                    this.updateVisualContextFromAnalysis(analysis);
                }
            } catch (error) {
                console.error('❌ Local screen analysis failed:', error);
            }
        }, this.analysisIntervalMs);
    }

    async analyzeScreenLocally(canvas) {
        try {
            const ctx = canvas.getContext('2d');
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            // Analyze the screen content locally
            const analysis = {
                section: null,
                artwork: null,
                isModalOpen: false,
                confidence: 0.0,
                description: '',
                detectedElements: []
            };

            // 1. Check for modal (dark overlay, centered content)
            const modalResult = this.detectModal(data, canvas.width, canvas.height);
            analysis.isModalOpen = modalResult.isModal;
            analysis.confidence = Math.max(analysis.confidence, modalResult.confidence);

            // 2. Detect text regions and content
            const textRegions = this.detectTextRegions(data, canvas.width, canvas.height);
            analysis.detectedElements = textRegions;

            // 3. Analyze color patterns to identify sections
            const colorAnalysis = this.analyzeColorPatterns(data, canvas.width, canvas.height);
            analysis.section = colorAnalysis.section;
            if (colorAnalysis.confidence > analysis.confidence) {
                analysis.confidence = colorAnalysis.confidence;
            }

            // 4. Detect specific artworks based on visual patterns
            const artworkDetection = this.detectArtworks(data, canvas.width, canvas.height, textRegions);
            if (artworkDetection.artwork) {
                analysis.artwork = artworkDetection.artwork;
                analysis.confidence = Math.max(analysis.confidence, artworkDetection.confidence);
            }

            // 5. Generate description
            analysis.description = this.generateDescription(analysis);

            console.log('🔍 Local Screen Analysis:', analysis);
            return analysis;

        } catch (error) {
            console.error('❌ Local screen analysis failed:', error);
            return null;
        }
    }

    detectModal(data, width, height) {
        // Look for dark overlay pattern typical of modals
        let darkPixels = 0;
        let totalPixels = width * height;

        // Sample pixels to check for dark overlay
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const brightness = (r + g + b) / 3;

            if (brightness < 50) { // Dark pixel
                darkPixels++;
            }
        }

        const darkRatio = darkPixels / totalPixels;
        const isModal = darkRatio > 0.3; // More than 30% dark pixels suggests modal overlay

        return {
            isModal,
            confidence: isModal ? Math.min(darkRatio * 2, 0.9) : 0.1
        };
    }

    detectTextRegions(data, width, height) {
        const regions = [];
        const blockSize = 20; // Analyze in 20x20 blocks

        for (let y = 0; y < height - blockSize; y += blockSize) {
            for (let x = 0; x < width - blockSize; x += blockSize) {
                const contrast = this.calculateBlockContrast(data, width, x, y, blockSize);

                if (contrast > 100) { // High contrast suggests text
                    // Try to extract text-like patterns
                    const textPattern = this.extractTextPattern(data, width, x, y, blockSize);
                    if (textPattern) {
                        regions.push({
                            x, y,
                            width: blockSize,
                            height: blockSize,
                            type: 'text_region',
                            pattern: textPattern,
                            contrast
                        });
                    }
                }
            }
        }

        return regions;
    }

    calculateBlockContrast(data, width, x, y, blockSize) {
        let minBrightness = 255;
        let maxBrightness = 0;

        for (let by = 0; by < blockSize; by++) {
            for (let bx = 0; bx < blockSize; bx++) {
                const pixelIndex = ((y + by) * width + (x + bx)) * 4;
                const r = data[pixelIndex];
                const g = data[pixelIndex + 1];
                const b = data[pixelIndex + 2];
                const brightness = (r + g + b) / 3;

                minBrightness = Math.min(minBrightness, brightness);
                maxBrightness = Math.max(maxBrightness, brightness);
            }
        }

        return maxBrightness - minBrightness;
    }

    extractTextPattern(data, width, x, y, blockSize) {
        // Simple pattern recognition for common text elements
        const patterns = {
            'ANIMATIONS': this.matchPattern(data, width, x, y, blockSize, 'ANIMATIONS'),
            'ILLUSTRATIONS': this.matchPattern(data, width, x, y, blockSize, 'ILLUSTRATIONS'),
            'DRAWINGS': this.matchPattern(data, width, x, y, blockSize, 'DRAWINGS'),
            'ABOUT': this.matchPattern(data, width, x, y, blockSize, 'ABOUT'),
            'WORKFLOW': this.matchPattern(data, width, x, y, blockSize, 'WORKFLOW'),
            'CONTACT': this.matchPattern(data, width, x, y, blockSize, 'CONTACT')
        };

        // Find the best match
        let bestMatch = null;
        let bestScore = 0;

        for (const [text, score] of Object.entries(patterns)) {
            if (score > bestScore && score > 0.3) {
                bestMatch = text;
                bestScore = score;
            }
        }

        return bestMatch ? { text: bestMatch, confidence: bestScore } : null;
    }

    matchPattern(data, width, x, y, blockSize, targetText) {
        // Very basic pattern matching - in a real implementation you'd use OCR
        // For now, we'll use simple heuristics based on text length and position
        const textLength = targetText.length;
        const expectedWidth = textLength * 10; // Rough character width estimate

        if (blockSize < expectedWidth / 2) return 0; // Block too small for this text

        // Check if this looks like a header area (top portion of screen)
        const relativeY = y / (width * 0.1); // Top 10% of screen
        if (relativeY > 1) return 0.1; // Not in header area

        // Return confidence based on position and size heuristics
        return Math.min(blockSize / expectedWidth, 1) * 0.5;
    }

    analyzeColorPatterns(data, width, height) {
        // Analyze dominant colors to identify sections
        const colorHistogram = {};

        // Sample pixels
        for (let i = 0; i < data.length; i += 16) { // Sample every 4th pixel
            const r = Math.floor(data[i] / 32) * 32;
            const g = Math.floor(data[i + 1] / 32) * 32;
            const b = Math.floor(data[i + 2] / 32) * 32;
            const color = `${r},${g},${b}`;

            colorHistogram[color] = (colorHistogram[color] || 0) + 1;
        }

        // Find dominant colors
        const dominantColors = Object.entries(colorHistogram)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5);

        // Map colors to sections (simplified approach)
        const sectionColors = {
            'animations': ['102,126,234', '103,126,234'], // Blue tones
            'illustrations': ['246,147,251', '245,147,251'], // Pink tones
            'drawings': ['79,172,254', '78,172,254'], // Light blue tones
            'about': ['22,22,46', '23,22,46'], // Dark blue
            'workflow': ['26,38,78', '27,38,78'], // Dark blue
            'contact': ['22,22,46', '23,22,46'] // Dark blue
        };

        let bestSection = null;
        let bestConfidence = 0;

        for (const [section, colors] of Object.entries(sectionColors)) {
            let sectionScore = 0;
            for (const color of colors) {
                const colorCount = colorHistogram[color] || 0;
                sectionScore += colorCount;
            }

            const confidence = sectionScore / 1000; // Normalize
            if (confidence > bestConfidence) {
                bestSection = section;
                bestConfidence = Math.min(confidence, 0.9);
            }
        }

        return {
            section: bestSection,
            confidence: bestConfidence
        };
    }

    detectArtworks(data, width, height, textRegions) {
        // Look for artwork-specific patterns
        const knownArtworks = [
            'Divine Dance', 'Mystic Forest', 'Sacred Waters',
            'Urban Mandala', 'Goddess Portrait', 'Digital Fusion'
        ];

        let bestArtwork = null;
        let bestConfidence = 0;

        // Check text regions for artwork names
        for (const region of textRegions) {
            if (region.pattern && region.pattern.text) {
                const detectedText = region.pattern.text.toLowerCase();
                for (const artwork of knownArtworks) {
                    if (detectedText.includes(artwork.toLowerCase())) {
                        bestArtwork = artwork;
                        bestConfidence = region.pattern.confidence;
                        break;
                    }
                }
            }
        }

        // If no text match, look for visual patterns (simplified)
        if (!bestArtwork) {
            // Check for modal-like layout which often indicates artwork viewing
            const centerX = width / 2;
            const centerY = height / 2;
            const centerBrightness = this.getAverageBrightness(data, width, centerX - 50, centerY - 50, 100, 100);

            if (centerBrightness > 150) { // Bright center suggests artwork
                bestArtwork = 'Unknown Artwork';
                bestConfidence = 0.4;
            }
        }

        return {
            artwork: bestArtwork,
            confidence: bestConfidence
        };
    }

    getAverageBrightness(data, width, startX, startY, w, h) {
        let totalBrightness = 0;
        let pixelCount = 0;

        for (let y = startY; y < startY + h && y < height; y++) {
            for (let x = startX; x < startX + w && x < width; x++) {
                const pixelIndex = (y * width + x) * 4;
                const r = data[pixelIndex];
                const g = data[pixelIndex + 1];
                const b = data[pixelIndex + 2];
                const brightness = (r + g + b) / 3;

                totalBrightness += brightness;
                pixelCount++;
            }
        }

        return pixelCount > 0 ? totalBrightness / pixelCount : 0;
    }

    generateDescription(analysis) {
        if (analysis.isModalOpen && analysis.artwork) {
            return `Viewing ${analysis.artwork} in modal`;
        } else if (analysis.artwork) {
            return `Looking at ${analysis.artwork}`;
        } else if (analysis.section) {
            return `Browsing ${analysis.section} section`;
        } else {
            return 'Viewing portfolio content';
        }
    }

    updateVisualContextFromAnalysis(analysis) {
        if (!analysis || analysis.confidence < 0.3) {
            console.log('⚠️ Low confidence analysis, skipping context update');
            return;
        }

        const { section, artwork, isModalOpen, confidence } = analysis;

        // Update visual context based on screen analysis
        if (isModalOpen && artwork) {
            updateVisualContext(section, artwork, confidence, 'screen_vision_modal');
        } else if (artwork) {
            updateVisualContext(section, artwork, confidence, 'screen_vision_artwork');
        } else if (section) {
            updateVisualContext(section, null, confidence, 'screen_vision_section');
        }

        // Store analysis with timestamp
        this.lastAnalysis = {
            ...analysis,
            timestamp: Date.now()
        };
    }

    stop() {
        this.isActive = false;

        if (this.analysisInterval) {
            clearInterval(this.analysisInterval);
            this.analysisInterval = null;
        }

        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }

        if (this.canvas) {
            this.canvas.remove();
            this.canvas = null;
        }

        console.log('🛑 Screen vision stopped');
    }

    // Fallback to traditional context tracking
    fallbackToTraditionalTracking() {
        console.log('🔄 Falling back to traditional visual context tracking');
        // The existing intersection observers and viewport calculations will continue working
        // This is called when screen vision fails or is not available
    }


}

// Global screen vision instance
window.screenVision = new ScreenVision();

// Initialize Website
function initializeWebsite() {
    setupAILoadingScreen();
    setupDarkMode();
    setupScreenVisionControls();

    // Initialize screen vision if supported
    if (window.platformInfo.supportsScreenVision) {
        window.screenVision.initialize().then(success => {
            if (success) {
                console.log('🎥 Screen vision ready');
                // Optionally auto-start or wait for user permission
            }
        });
    }
}

// After loading screen completes
function startMainExperience() {
    console.log('Starting main experience...');

    // Force remove loading screen if it still exists
    const loadingScreen = document.getElementById('ai-loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
        loadingScreen.style.visibility = 'hidden';
        console.log('Loading screen forcibly hidden');
    }

    // Make sure main content is visible
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';

    // Ensure all main sections are visible
    const hero = document.querySelector('.hero');
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');

    if (hero) {
        hero.style.display = 'flex';
        hero.style.opacity = '1';
        hero.style.visibility = 'visible';
    }
    if (navbar) {
        navbar.style.display = 'block';
        navbar.style.opacity = '1';
        navbar.style.visibility = 'visible';
    }

    sections.forEach(section => {
        section.style.display = 'block';
        section.style.opacity = '1';
        section.style.visibility = 'visible';
    });

    setupNavigation();
    setupScrollAnimations();
    setupEnhancedPortfolioInteractions(); // Enhanced with context tracking
    setupWorkflowAnimations();
    setupContactForm();
    setupModalSystem();
    setupSmoothScrolling();
    setupScrollProgress();

    // Initialize context indicator
    setTimeout(() => {
        updateContextIndicator();
        console.log('🎯 Initial context indicator set');
    }, 1000);

    // Ensure chatbot is visible
    const chatbot = document.getElementById('ai-chatbot');
    if (chatbot) {
        chatbot.style.display = 'block';
        chatbot.style.opacity = '1';
        chatbot.style.visibility = 'visible';
    }

    console.log('Main experience initialized!');
}



// Scroll Progress
function setupScrollProgress() {
    console.log('Setting up scroll progress...');
    const progressLine = document.querySelector('.progress-line');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrolled / maxScroll) * 100;

        if (progressLine) {
            progressLine.style.width = progress + '%';
        }
        console.log('Scroll progress:', progress + '%');
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
    console.log('Setting up navigation...');
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    console.log('Navigation elements:', { navbar, hamburger, navMenu, navLinks });
    
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

    // Update visual context when modal opens (highest confidence)
    updateVisualContext(category, title, 1.0, 'modal');

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
        setViewingModal(false); // Reset modal viewing state
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

// Advanced Visual Context Tracking Functions
function updateVisualContext(section, artwork = null, confidence = 1.0, source = 'unknown') {
    console.log(`🔄 UPDATING VISUAL CONTEXT (${source}):`, { section, artwork, confidence });

    // Only update if confidence is high enough or it's an intentional action
    const isIntentional = source === 'click' || source === 'modal' || source === 'sustained_attention';
    const shouldUpdate = isIntentional || confidence > 0.7;

    if (!shouldUpdate && window.visualContext.attentionFocus) {
        console.log('⚠️ Low confidence update rejected - user attention focused elsewhere');
        return;
    }

    // Update context with confidence scoring
    window.visualContext.currentSection = section;
    window.visualContext.currentArtwork = artwork;
    window.visualContext.lastViewedItem = artwork || section;
    window.visualContext.contextConfidence = confidence;
    window.visualContext.lastIntentionalAction = source;

    // Set attention focus for intentional actions
    if (isIntentional) {
        window.visualContext.attentionFocus = artwork || section;
        console.log('🎯 Attention focus set to:', window.visualContext.attentionFocus);
    }

    // Add to viewing history (keep last 5 items)
    if (artwork) {
        window.visualContext.viewingHistory.unshift(`${section}: ${artwork}`);
    } else {
        window.visualContext.viewingHistory.unshift(section);
    }
    window.visualContext.viewingHistory = window.visualContext.viewingHistory.slice(0, 5);

    console.log('✅ Visual context updated:', window.visualContext);

    // Update UI indicator if available
    updateContextIndicator();
}

// Calculate what content is actually visible in viewport
function calculateViewportContext() {
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const scrollY = window.scrollY;

    // Update viewport center
    window.visualContext.viewportCenter = {
        x: viewportWidth / 2,
        y: scrollY + viewportHeight / 2
    };

    // Find which section is most visible
    const sections = ['about', 'animations', 'illustrations', 'drawings', 'workflow', 'contact'];
    let bestSection = null;
    let maxSectionVisibility = 0;

    sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + scrollY;
            const elementBottom = rect.bottom + scrollY;
            const elementHeight = rect.height;

            // Calculate how much of the section is visible
            const visibleTop = Math.max(scrollY, elementTop);
            const visibleBottom = Math.min(scrollY + viewportHeight, elementBottom);
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);
            const visibilityRatio = visibleHeight / elementHeight;

            if (visibilityRatio > maxSectionVisibility && visibilityRatio > 0.3) { // At least 30% visible
                maxSectionVisibility = visibilityRatio;
                bestSection = sectionId;
            }
        }
    });

    // Now check for individual artworks in the best section
    let bestArtwork = null;
    let maxArtworkVisibility = 0;

    if (bestSection) {
        const sectionElement = document.getElementById(bestSection);
        if (sectionElement) {
            const portfolioCards = sectionElement.querySelectorAll('.portfolio-card');

            portfolioCards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const cardTop = rect.top + scrollY;
                const cardBottom = rect.bottom + scrollY;
                const cardHeight = rect.height;

                // Calculate how much of the card is visible
                const visibleTop = Math.max(scrollY, cardTop);
                const visibleBottom = Math.min(scrollY + viewportHeight, cardBottom);
                const visibleHeight = Math.max(0, visibleBottom - visibleTop);
                const visibilityRatio = visibleHeight / cardHeight;

                // Check if card is significantly visible (at least 50% and in viewport center area)
                const cardCenterY = cardTop + cardHeight / 2;
                const viewportCenterY = scrollY + viewportHeight / 2;
                const distanceFromCenter = Math.abs(cardCenterY - viewportCenterY);
                const centerWeight = Math.max(0, 1 - (distanceFromCenter / (viewportHeight / 2)));

                const weightedVisibility = visibilityRatio * (0.7 + 0.3 * centerWeight);

                if (weightedVisibility > maxArtworkVisibility && visibilityRatio > 0.5) {
                    maxArtworkVisibility = weightedVisibility;
                    const titleElement = card.querySelector('h3');
                    bestArtwork = titleElement ? titleElement.textContent.trim() : null;
                }
            });
        }
    }

    // Update context based on what we found
    if (bestArtwork && maxArtworkVisibility > 0.6) {
        // High confidence artwork detection
        updateVisualContext(bestSection, bestArtwork, maxArtworkVisibility, 'viewport_artwork');
    } else if (bestSection && bestSection !== window.visualContext.currentSection) {
        // Fallback to section tracking
        updateVisualContext(bestSection, null, maxSectionVisibility, 'viewport_scroll');
    }

    return { section: bestSection, artwork: bestArtwork };
}

function setViewingModal(isViewing) {
    window.visualContext.isViewingModal = isViewing;
    console.log('Modal viewing state:', isViewing);
}

// Intelligent portfolio interactions with attention-based context tracking
function setupEnhancedPortfolioInteractions() {
    console.log('🎨 Setting up intelligent portfolio interactions...');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    console.log('Found portfolio cards:', portfolioCards.length);

    portfolioCards.forEach((card, index) => {
        const item = card.closest('.portfolio-item');
        const category = item ? item.dataset.category : 'unknown';
        const titleElement = card.querySelector('h3');
        const title = titleElement ? titleElement.textContent.trim() : 'unknown';

        console.log(`Card ${index}: category="${category}", title="${title}"`);

        let hoverTimeout = null;

        // Track hover start for sustained attention
        card.addEventListener('mouseenter', () => {
            console.log('🖱️ Mouse entered card:', title);
            window.visualContext.hoverStartTime = Date.now();

            // Clear any existing timeout
            if (hoverTimeout) clearTimeout(hoverTimeout);

            // Set timeout for sustained attention (2 seconds)
            hoverTimeout = setTimeout(() => {
                const hoverDuration = Date.now() - window.visualContext.hoverStartTime;
                if (hoverDuration >= window.visualContext.sustainedAttentionThreshold) {
                    console.log('⏰ Sustained attention detected on:', title);
                    updateVisualContext(category, title, 0.8, 'sustained_attention');
                }
            }, window.visualContext.sustainedAttentionThreshold);
        });

        // Clear hover timeout on mouse leave
        card.addEventListener('mouseleave', () => {
            if (hoverTimeout) {
                clearTimeout(hoverTimeout);
                hoverTimeout = null;
            }
        });

        // Enhanced click handler with high confidence
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking on the Ask Ronica button (it has its own handler)
            if (e.target.closest('.ask-ronica-indicator')) {
                console.log('🎯 Ask Ronica button clicked, skipping modal');
                return;
            }

            console.log('👆 Card clicked:', title);
            updateVisualContext(category, title, 1.0, 'click');
            setViewingModal(true);
            openPortfolioModal(card);
        });

        // Add click handler for Ask Ronica buttons (highest confidence)
        const askButton = card.querySelector('.ask-ronica-indicator');
        if (askButton) {
            askButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent card click
                console.log('🤖 Ask Ronica clicked for:', title);
                updateVisualContext(category, title, 1.0, 'ask_ronica_button');
                // Trigger chatbot toggle
                const toggle = document.querySelector('.chatbot-toggle');
                if (toggle) {
                    toggle.click();
                }
            });
        }
    });

    // Set up viewport context tracking
    setupViewportContextTracking();

    // Set up intelligent section tracking
    setupSectionContextTracking();
}

// Viewport-based context tracking
function setupViewportContextTracking() {
    let scrollTimeout = null;

    function handleScroll() {
        if (scrollTimeout) clearTimeout(scrollTimeout);

        // Debounce scroll events
        scrollTimeout = setTimeout(() => {
            calculateViewportContext();
        }, 200);
    }

    window.addEventListener('scroll', handleScroll);
    // Initial calculation
    setTimeout(calculateViewportContext, 1000);
}

// Intelligent section and artwork context tracking
function setupSectionContextTracking() {
    // Section observer
    const sectionObserverOptions = {
        threshold: [0.1, 0.3, 0.5, 0.7],
        rootMargin: '-10% 0px -10% 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        let bestEntry = null;
        let maxRatio = 0;

        entries.forEach(entry => {
            const sectionId = entry.target.id;
            if (sectionId && ['animations', 'illustrations', 'drawings', 'about', 'workflow', 'contact'].includes(sectionId)) {
                if (entry.intersectionRatio > maxRatio) {
                    maxRatio = entry.intersectionRatio;
                    bestEntry = entry;
                }
            }
        });

        if (bestEntry && maxRatio > 0.3) {
            const sectionId = bestEntry.target.id;
            // Only update if this section is significantly more visible
            if (sectionId !== window.visualContext.currentSection) {
                updateVisualContext(sectionId, null, maxRatio, 'section_visibility');
            }
        }
    }, sectionObserverOptions);

    // Observe all main sections
    document.querySelectorAll('section[id]').forEach(section => {
        sectionObserver.observe(section);
    });

    // Artwork observer for individual portfolio cards
    const artworkObserverOptions = {
        threshold: [0.2, 0.4, 0.6, 0.8],
        rootMargin: '-20% 0px -20% 0px'
    };

    const artworkObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const card = entry.target;
            const item = card.closest('.portfolio-item');
            if (!item) return;

            const category = item.dataset.category;
            const titleElement = card.querySelector('h3');
            const title = titleElement ? titleElement.textContent.trim() : 'unknown';

            if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
                // Card is prominently visible
                console.log(`👁️ Artwork "${title}" is now visible (${Math.round(entry.intersectionRatio * 100)}% visible)`);
                updateVisualContext(category, title, entry.intersectionRatio, 'artwork_visibility');
            }
        });
    }, artworkObserverOptions);

    // Observe all portfolio cards
    document.querySelectorAll('.portfolio-card').forEach(card => {
        artworkObserver.observe(card);
    });
}

// Artwork details database
function getArtworkDetails(artworkName) {
    const artworkDatabase = {
        'Divine Dance': {
            description: 'This is a mesmerizing 3D animation that brings the traditional Kathakali dance form to life through modern digital techniques.',
            technique: 'Blender 3D modeling, After Effects compositing, and motion capture technology',
            theme: 'the spiritual energy and cultural heritage of classical Indian dance',
            cultural: 'Kathakali is one of India\'s oldest classical dance forms, originating from Kerala'
        },
        'Mystic Forest': {
            description: 'An interactive forest animation featuring mythical creatures drawn from Indian folklore and mythology.',
            technique: 'Cinema 4D particle systems, Redshift rendering, and procedural animation',
            theme: 'the magical realm of Indian mythology and nature spirits',
            cultural: 'Inspired by ancient Indian texts like the Vedas and Puranas'
        },
        'Cosmic Mandala': {
            description: 'An abstract animation exploring the universe through traditional mandala patterns and sacred geometry.',
            technique: 'Houdini procedural generation, TouchDesigner real-time rendering, and mathematical algorithms',
            theme: 'the interconnectedness of all things through sacred geometric patterns',
            cultural: 'Mandala symbolism is central to Hindu and Buddhist spiritual traditions'
        },
        'Sacred Waters': {
            description: 'A photorealistic digital painting capturing the serene beauty of the Ganges River at dawn.',
            technique: 'Photoshop digital painting, custom brushes, and advanced layering techniques',
            theme: 'the spiritual purity and life-giving essence of India\'s sacred river',
            cultural: 'The Ganges is considered the holiest river in Hinduism, symbolizing purification and enlightenment'
        },
        'Goddess Awakening': {
            description: 'A contemporary interpretation of Goddess Durga, blending traditional iconography with modern digital aesthetics.',
            technique: 'Procreate digital illustration, custom textures, and symbolic color palettes',
            theme: 'feminine power, protection, and the awakening of divine consciousness',
            cultural: 'Durga is a principal Hindu goddess representing strength and protection against evil forces'
        },
        'Urban Mandala': {
            description: 'A geometric mandala design incorporating architectural elements from modern Mumbai.',
            technique: 'Illustrator vector graphics, mathematical precision, and urban photography references',
            theme: 'the harmony between ancient spiritual geometry and contemporary urban life',
            cultural: 'Combines sacred mandala traditions with the vibrant energy of Mumbai\'s cityscape'
        },
        'Charcoal Portrait': {
            description: 'An intimate portrait study using traditional charcoal techniques to capture human emotion and depth.',
            technique: 'Classical charcoal drawing, blending techniques, and expressive mark-making',
            theme: 'the inner beauty and emotional complexity of the human spirit',
            cultural: 'Draws from the rich tradition of Indian portraiture and classical art studies'
        },
        'Ink Mandala': {
            description: 'An intricate mandala design created with traditional dip pen and ink, exploring spiritual geometry.',
            technique: 'Dip pen illustration, India ink, and precise geometric construction',
            theme: 'meditative focus and the mathematical perfection of sacred geometry',
            cultural: 'Mandala creation is a spiritual practice in Hindu and Buddhist traditions'
        },
        'Urban Sketch': {
            description: 'A mixed media sketch capturing the vibrant chaos and energy of Mumbai street life.',
            technique: 'Mixed media drawing, urban sketching techniques, and expressive line work',
            theme: 'the dynamic energy and cultural diversity of contemporary Indian urban life',
            cultural: 'Inspired by the bustling streets of Mumbai and India\'s vibrant street culture'
        }
    };

    return artworkDatabase[artworkName] || {
        description: 'This is a beautiful piece from the portfolio.',
        technique: 'advanced digital techniques',
        theme: 'cultural fusion and artistic expression',
        cultural: 'Indian artistic traditions'
    };
}

// Advanced Visual Context Indicator
function updateContextIndicator() {
    let indicator = document.getElementById('context-indicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'context-indicator';
        indicator.style.cssText = `
            position: fixed;
            top: 10px;
            left: 10px;
            background: rgba(102, 126, 234, 0.9);
            color: white;
            padding: 8px 12px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 600;
            z-index: 10000;
            pointer-events: none;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            max-width: 250px;
            word-wrap: break-word;
        `;
        document.body.appendChild(indicator);
    }

    const context = window.visualContext;
    let text = '👁️ Ronica sees: ';

    if (context.attentionFocus) {
        text += `🎯 "${context.attentionFocus}"`;
    } else if (context.currentArtwork) {
        text += `"${context.currentArtwork}" (${context.currentSection})`;
    } else if (context.currentSection) {
        text += `${context.currentSection} section`;
    } else {
        text += 'homepage';
    }

    // Add confidence indicator
    const confidencePercent = Math.round(context.contextConfidence * 100);
    text += ` (${confidencePercent}% confident)`;

    // Add source indicator
    if (context.lastIntentionalAction) {
        const sourceIcons = {
            'click': '👆',
            'ask_ronica_button': '🤖',
            'sustained_attention': '⏰',
            'section_visibility': '📍',
            'viewport_scroll': '📜'
        };
        text += ` ${sourceIcons[context.lastIntentionalAction] || '❓'}`;
    }

    indicator.textContent = text;

    // Color code based on confidence
    if (confidencePercent >= 90) {
        indicator.style.background = 'rgba(34, 197, 94, 0.9)'; // Green for high confidence
    } else if (confidencePercent >= 70) {
        indicator.style.background = 'rgba(251, 191, 36, 0.9)'; // Yellow for medium confidence
    } else {
        indicator.style.background = 'rgba(239, 68, 68, 0.9)'; // Red for low confidence
    }
}

// Advanced debug function to manually check context
window.debugContext = function() {
    console.log('🔍 Current Visual Context:', window.visualContext);
    console.log('🎯 Current Conversation Context:', window.conversationContext);
    console.log('📊 Context Analysis:', {
        hasAttentionFocus: !!window.visualContext.attentionFocus,
        confidenceLevel: `${Math.round(window.visualContext.contextConfidence * 100)}%`,
        lastAction: window.visualContext.lastIntentionalAction,
        viewportCenter: window.visualContext.viewportCenter,
        viewingHistory: window.visualContext.viewingHistory
    });
    updateContextIndicator();

    // Show what Ronica would say about current context
    const testResponse = generateContextAwareResponse("what is this");
    console.log('🗣️ Test response for "what is this":', testResponse);
};

// Helper function to test context-aware responses
function generateContextAwareResponse(message) {
    const lowerMessage = message.toLowerCase();
    let response = "I need more context to answer that.";

    if (window.visualContext.attentionFocus) {
        const artworkDetails = getArtworkDetails(window.visualContext.attentionFocus);
        if (artworkDetails.description) {
            response = `You're asking about "${window.visualContext.attentionFocus}". ${artworkDetails.description}`;
        }
    } else if (window.visualContext.currentArtwork) {
        const artworkDetails = getArtworkDetails(window.visualContext.currentArtwork);
        response = `Based on what I can see, you're referring to "${window.visualContext.currentArtwork}". ${artworkDetails.description}`;
    }

    return response;
}

// Export functions for global use
window.scrollToSection = scrollToSection;
window.updateVisualContext = updateVisualContext;
window.setViewingModal = setViewingModal;
window.getArtworkDetails = getArtworkDetails;
window.debugContext = window.debugContext;

// Utility function for content visibility (kept for potential future use)
window.forceShowContent = function() {
    console.log('Ensuring content visibility...');
    document.body.style.overflow = 'auto';

    const loadingScreen = document.getElementById('ai-loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }

    const hero = document.querySelector('.hero');
    const navbar = document.querySelector('.navbar');
    const chatbot = document.getElementById('ai-chatbot');
    const sections = document.querySelectorAll('section');

    if (hero) hero.style.display = 'flex';
    if (navbar) navbar.style.display = 'block';
    if (chatbot) chatbot.style.display = 'block';

    sections.forEach(section => {
        section.style.display = 'block';
        section.style.opacity = '1';
        section.style.visibility = 'visible';
    });

    startMainExperience();
};
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

// Debug function to check current visual context
function debugVisualContext() {
    console.log('🔍 Current Visual Context:', window.visualContext);

    const context = window.visualContext;
    console.log('📊 Context Summary:', {
        hasAttentionFocus: !!context.attentionFocus,
        confidenceLevel: `${Math.round(context.contextConfidence * 100)}%`,
        lastAction: context.lastIntentionalAction,
        viewportCenter: context.viewportCenter,
        viewingHistory: context.viewingHistory.slice(0, 3) // Show last 3 items
    });

    // Provide contextual response based on current state
    let response = '';

    if (context.attentionFocus) {
        const artworkDetails = getArtworkDetails(context.attentionFocus);
        if (artworkDetails.description) {
            response = `You're asking about "${context.attentionFocus}". ${artworkDetails.description}`;
        } else {
            response = `I see you're focused on "${context.attentionFocus}" in the ${context.currentSection} section.`;
        }
    } else if (context.currentArtwork) {
        const artworkDetails = getArtworkDetails(context.currentArtwork);
        response = `Based on what I can see, you're referring to "${context.currentArtwork}". ${artworkDetails.description}`;
    } else if (context.currentSection) {
        response = `You're currently viewing the ${context.currentSection} section of the portfolio.`;
    } else {
        response = 'I\'m not sure what you\'re looking at right now. Could you tell me which section or artwork interests you?';
    }

    return response;
}

// Screen Vision Controls
function setupScreenVisionControls() {
    if (!window.platformInfo.supportsScreenVision) {
        console.log('📱 Screen vision controls not available on this platform');
        return;
    }

    // Add screen vision toggle to chatbot
    const chatbotHeader = document.querySelector('.chatbot-header');
    if (chatbotHeader) {
        const visionButton = document.createElement('button');
        visionButton.className = 'screen-vision-toggle';
        visionButton.innerHTML = '👁️';
        visionButton.title = 'Toggle Screen Vision (Gemini Live-style)';
        visionButton.style.cssText = `
            background: none;
            border: none;
            color: #667eea;
            font-size: 1.2rem;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 50%;
            transition: all 0.3s ease;
        `;

        visionButton.addEventListener('mouseenter', () => {
            visionButton.style.background = 'rgba(102, 126, 234, 0.1)';
        });

        visionButton.addEventListener('mouseleave', () => {
            visionButton.style.background = 'none';
        });

        visionButton.addEventListener('click', async () => {
            if (window.screenVision.isActive) {
                window.screenVision.stop();
                visionButton.innerHTML = '👁️';
                visionButton.title = 'Start Screen Vision';
                visionButton.style.color = '#667eea';
                visionButton.classList.remove('screen-vision-active');
            } else {
                const started = await window.screenVision.startScreenCapture();
                if (started) {
                    visionButton.innerHTML = '🎥';
                    visionButton.title = 'Stop Screen Vision (Local AI Analysis)';
                    visionButton.style.color = '#4CAF50';
                    visionButton.classList.add('screen-vision-active');
                } else {
                    alert('Screen vision could not be started. Please check your browser permissions.');
                }
            }
        });

        chatbotHeader.appendChild(visionButton);
    }
}

// Add keyboard shortcut for debugging (Ctrl+Shift+D)
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        debugVisualContext();
        console.log('🎯 Debug: Visual context logged to console');
    }
});

// Add keyboard shortcut for screen vision (Ctrl+Shift+V)
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'V') {
        e.preventDefault();
        if (window.platformInfo.supportsScreenVision) {
            const toggle = document.querySelector('.screen-vision-toggle');
            if (toggle) {
                toggle.click();
            }
        }
    }
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
