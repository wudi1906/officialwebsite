// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeComponents();
});

// Initialize all components
function initializeComponents() {
    initNavigation();
    initScrollEffects();
    initAnimations();
    initFormHandling();
    initStatsCounter();
    initSmoothScrolling();
    initMobileMenu();
}

// Navigation functionality
function initNavigation() {
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Active navigation highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Scroll animations
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const elementsToAnimate = document.querySelectorAll(`
        .solution-card,
        .stat-card,
        .compliance-card,
        .partner-logo,
        .contact-item,
        .hero-stats .stat-item
    `);
    
    elementsToAnimate.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Enhanced animations
function initAnimations() {
    // Add stagger animation to cards
    const cardGroups = [
        document.querySelectorAll('.solution-card'),
        document.querySelectorAll('.compliance-card'),
        document.querySelectorAll('.partner-logo'),
        document.querySelectorAll('.stat-card')
    ];
    
    cardGroups.forEach(cards => {
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    });
    
    // Hero title animation
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCta = document.querySelector('.hero-cta');
    
    if (heroTitle) {
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 300);
    }
    
    if (heroSubtitle) {
        setTimeout(() => {
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 600);
    }
    
    if (heroCta) {
        setTimeout(() => {
            heroCta.style.opacity = '1';
            heroCta.style.transform = 'translateY(0)';
        }, 900);
    }
}

// Stats counter animation
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const countUp = (element, target) => {
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format numbers appropriately
            if (target >= 1000000) {
                element.textContent = (current / 1000000).toFixed(1) + 'M+';
            } else if (target >= 1000) {
                element.textContent = (current / 1000).toFixed(0) + 'K+';
            } else if (element.textContent.includes('<')) {
                element.textContent = '<0.3%';
            } else if (element.textContent.includes('min')) {
                element.textContent = '4.7 min';
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 16);
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const text = entry.target.textContent;
                
                // Parse numbers from text
                let target = 0;
                if (text.includes('62M+')) target = 62000000;
                else if (text.includes('130+')) target = 130;
                else if (text.includes('1000+')) target = 1000;
                else if (text.includes('<0.3%')) return; // Skip this one
                else if (text.includes('4.7 min')) return; // Skip this one
                
                if (target > 0) {
                    countUp(entry.target, target);
                }
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Smooth scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form handling
function initFormHandling() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        
        // Add real-time validation
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearError);
        });
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (!validateForm(data)) {
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        showNotification('Thank you! Your message has been sent successfully.', 'success');
        e.target.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function validateForm(data) {
    let isValid = true;
    
    // Name validation
    if (!data.name || data.name.trim().length < 2) {
        showFieldError('name', 'Name must be at least 2 characters long');
        isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Subject validation
    if (!data.subject || data.subject.trim().length < 5) {
        showFieldError('subject', 'Subject must be at least 5 characters long');
        isValid = false;
    }
    
    // Message validation
    if (!data.message || data.message.trim().length < 10) {
        showFieldError('message', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    return isValid;
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    clearError(e);
    
    switch (field.name) {
        case 'name':
            if (value.length < 2) {
                showFieldError('name', 'Name must be at least 2 characters long');
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value && !emailRegex.test(value)) {
                showFieldError('email', 'Please enter a valid email address');
            }
            break;
        case 'subject':
            if (value.length < 5) {
                showFieldError('subject', 'Subject must be at least 5 characters long');
            }
            break;
        case 'message':
            if (value.length < 10) {
                showFieldError('message', 'Message must be at least 10 characters long');
            }
            break;
    }
}

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const formGroup = field.closest('.form-group');
    
    // Remove existing error
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error styling
    field.style.borderColor = '#ef4444';
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    
    formGroup.appendChild(errorDiv);
}

function clearError(e) {
    const field = e.target;
    const formGroup = field.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    
    if (errorMessage) {
        errorMessage.remove();
    }
    
    field.style.borderColor = '#e5e7eb';
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    `;
    
    // Set background color based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Utility functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimizations
const debouncedScrollHandler = debounce(() => {
    // Handle scroll events that don't need immediate response
}, 16);

const throttledScrollHandler = throttle(() => {
    // Handle scroll events that need immediate response
}, 16);

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Optionally send error to logging service
});

// Initialize performance monitoring
function initPerformanceMonitoring() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
        });
    }
}

// Initialize accessibility features
function initAccessibility() {
    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add ARIA labels to interactive elements
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label') && !button.textContent.trim()) {
            button.setAttribute('aria-label', 'Button');
        }
    });
}

// Initialize all features when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initPerformanceMonitoring();
    initAccessibility();
});

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you have a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
} 

function openCookiePolicy() {
    const cookiePolicyContent = `
        <div class="cookie-policy-modal">
            <div class="cookie-policy-content">
                <span class="close-modal">&times;</span>
                <h2>Cookie Policy</h2>
                <p><strong>Last updated: July 2025</strong></p>
                
                <h3>1. Introduction</h3>
                <p>We are committed to transparency regarding how we use cookies and similar technologies on our website. This Cookie Policy explains what cookies are, how we use them, and your choices regarding their usage.</p>
                
                <h3>2. What Are Cookies?</h3>
                <p>Cookies are small text files stored on your device when you visit a website. They are widely used to ensure websites function properly, improve user experience, and collect aggregated information.</p>
                
                <h3>3. Types of Cookies We Use</h3>
                <table>
                    <tr>
                        <th>Type</th>
                        <th>Purpose</th>
                    </tr>
                    <tr>
                        <td>Essential Cookies</td>
                        <td>Required for the website to function. These include session cookies, authentication cookies, and security cookies.</td>
                    </tr>
                    <tr>
                        <td>Performance Cookies</td>
                        <td>Help us understand how visitors interact with our website (e.g., load balancing, uptime monitoring).</td>
                    </tr>
                    <tr>
                        <td>Preference Cookies</td>
                        <td>(If applicable) Store user settings like language or region. (Only if used)</td>
                    </tr>
                </table>
                
                <p><strong>❗ Note: We do not use cookies for advertising, cross-site tracking, profiling, or behavioral targeting.</strong></p>
                
                <h3>4. Third-Party Cookies</h3>
                <p>We do not use third-party cookies for advertising, analytics, or remarketing. All cookies currently in use are first-party and necessary for technical functionality.</p>
                
                <h3>5. Managing Cookies</h3>
                <p>You can control and delete cookies through your browser settings. Most browsers allow you to refuse or delete cookies. However, disabling certain cookies may impact site functionality.</p>
                
                <p>For more information:</p>
                <ul>
                    <li><a href="https://support.google.com/chrome/answer/95647" target="_blank">Manage cookies in Chrome</a></li>
                    <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank">Manage cookies in Firefox</a></li>
                    <li><a href="https://support.apple.com/en-us/HT201265" target="_blank">Manage cookies in Safari</a></li>
                </ul>
                
                <h3>6. Contact Us</h3>
                <p>If you have questions about this Cookie Policy or how we handle personal data, please contact us at:</p>
                <address>
                    Datapioneers LLC<br>
                    Email: support@datapioneer.net<br>
                    Address: 1908 Thomes Ave Ste 12018, Cheyenne, WY 82001
                </address>
            </div>
        </div>
    `;

    // 创建模态框元素
    const modalDiv = document.createElement('div');
    modalDiv.innerHTML = cookiePolicyContent;
    document.body.appendChild(modalDiv);

    // 关闭模态框的逻辑
    const closeModal = modalDiv.querySelector('.close-modal');
    closeModal.addEventListener('click', () => {
        document.body.removeChild(modalDiv);
    });

    // 点击模态框外部关闭
    modalDiv.addEventListener('click', (event) => {
        if (event.target === modalDiv.querySelector('.cookie-policy-modal')) {
            document.body.removeChild(modalDiv);
        }
    });
} 

function openTermsOfService() {
    const termsOfServiceContent = `
        <div class="terms-of-service-modal">
            <div class="terms-of-service-content">
                <span class="close-modal">&times;</span>
                <h2>📜 Datapioneers LLC - Terms of Service</h2>
                
                <h3>1. Agreement to Terms</h3>
                <p>By accessing or using the services provided by Datapioneers LLC ("Datapioneers", "we", "us"), you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, you must not use our website or services.</p>
                
                <h3>2. Services Overview</h3>
                <p>Datapioneers provides a data technology platform for market research, survey distribution, and digital measurement tools. Our platform enables research clients and partners to engage verified respondents through integrations such as APIs, offerwalls, embedded iframes, or secure distribution channels.</p>
                
                <h3>3. Eligibility</h3>
                <p>You must be a legal entity or an authorized representative of a business to enter into this agreement. Our services are intended for institutional use only.</p>
                
                <h3>4. Use of Platform</h3>
                <p>You agree to use the platform solely for lawful research and data collection purposes. Unauthorized use, including scraping, automated account creation, data reselling, or reverse-engineering, is strictly prohibited.</p>
                
                <h3>5. Client Responsibilities</h3>
                <p>Clients are responsible for:</p>
                <ul>
                    <li>Ensuring their surveys and data collection practices comply with applicable laws and industry standards;</li>
                    <li>Providing accurate targeting parameters and project specifications;</li>
                    <li>Honoring any data use disclosures provided to respondents (if applicable).</li>
                </ul>
                
                <h3>6. Data Privacy and Security</h3>
                <p>Datapioneers employs robust technical and organizational safeguards to protect data. While we do not collect or store personally identifiable information unless explicitly required by project scope, all data access and transfers are encrypted and logged. We adhere to major international standards for data handling.</p>
                
                <h3>7. Intellectual Property</h3>
                <p>All intellectual property on the platform, including code, branding, and proprietary methodologies, belongs to Datapioneers LLC. Unauthorized copying, modification, or redistribution is prohibited.</p>
                
                <h3>8. API Access and Integration</h3>
                <p>Clients using our APIs or embedded components agree not to misuse access tokens or disrupt platform stability. We reserve the right to suspend or revoke API access for any abuse or security violation.</p>
                
                <h3>9. Limitation of Liability</h3>
                <p>Datapioneers shall not be liable for any indirect, incidental, or consequential damages arising from platform usage, including but not limited to data loss, business interruption, or third-party service failure.</p>
                
                <h3>10. Termination</h3>
                <p>We reserve the right to suspend or terminate your access to the platform at any time, with or without notice, for conduct that violates these Terms or harms the platform's integrity.</p>
                
                <h3>11. Governing Law</h3>
                <p>These Terms shall be governed by the laws of the State of Wyoming, USA, where Datapioneers LLC is incorporated.</p>
                
                <h3>12. Contact</h3>
                <p>For any inquiries regarding these Terms, please contact us at:</p>
                <p>📩 support@datapioneer.net</p>
            </div>
        </div>
    `;

    // 创建模态框元素
    const modalDiv = document.createElement('div');
    modalDiv.innerHTML = termsOfServiceContent;
    document.body.appendChild(modalDiv);

    // 关闭模态框的逻辑
    const closeModal = modalDiv.querySelector('.close-modal');
    closeModal.addEventListener('click', () => {
        document.body.removeChild(modalDiv);
    });

    // 点击模态框外部关闭
    modalDiv.addEventListener('click', (event) => {
        if (event.target === modalDiv.querySelector('.terms-of-service-modal')) {
            document.body.removeChild(modalDiv);
        }
    });
} 