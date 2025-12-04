// ===== DARK MODE - APPLY SAVED PREFERENCE IMMEDIATELY =====
// This runs immediately to prevent flash of wrong theme
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode === 'enabled') {
    document.documentElement.classList.add('dark-mode');
    document.body.classList.add('dark-mode');
    
    // Update logos immediately for dark mode
    // This runs before the DOM is fully loaded, so we need to wait
    document.addEventListener('DOMContentLoaded', () => {
        const headerLogo = document.querySelector('.logo-img');
        const footerLogo = document.querySelector('.footer-logo-img');
        if (headerLogo) headerLogo.src = 'Media/EB2 White Logo.png';
        if (footerLogo) footerLogo.src = 'Media/EB2 White Logo.png';
    });
}

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach(el => {
    observer.observe(el);
});

// ===== STATS COUNTER ANIMATION =====
const statNumbers = document.querySelectorAll('.stat-number');

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.target);
            let current = 0;
            const duration = 2000;
            const startTime = Date.now();

            function animate() {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);

                current = Math.floor(easeOutQuart * target);
                entry.target.textContent = current.toLocaleString();

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    entry.target.textContent = target.toLocaleString();
                }
            }

            animate();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => statsObserver.observe(stat));

// ===== QUOTE CAROUSEL =====
const quotes = [
    {
        text: "The world is a book, and those who do not travel read only one page.",
        author: "Saint Augustine"
    },
    {
        text: "Travel is the only thing you buy that makes you richer.",
        author: "Anonymous"
    },
    {
        text: "Not all those who wander are lost.",
        author: "J.R.R. Tolkien"
    },
    {
        text: "Adventure is worthwhile in itself.",
        author: "Amelia Earhart"
    },
    {
        text: "To travel is to live.",
        author: "Hans Christian Andersen"
    }
];

let currentQuoteIndex = 0;
const quoteText = document.querySelector('.quote-text');
const quoteAuthor = document.querySelector('.quote-author');
const prevBtn = document.querySelector('.quote-btn.prev');
const nextBtn = document.querySelector('.quote-btn.next');

if (quoteText && quoteAuthor && prevBtn && nextBtn) {
    function updateQuote(index) {
        quoteText.style.animation = 'fadeOut 0.3s ease';
        quoteAuthor.style.animation = 'fadeOut 0.3s ease';

        setTimeout(() => {
            quoteText.textContent = quotes[index].text;
            quoteAuthor.textContent = `— ${quotes[index].author}`;
            quoteText.style.animation = 'fadeUp 0.6s ease';
            quoteAuthor.style.animation = 'fadeUp 0.6s ease 0.2s';
        }, 300);
    }

    prevBtn.addEventListener('click', () => {
        currentQuoteIndex = (currentQuoteIndex - 1 + quotes.length) % quotes.length;
        updateQuote(currentQuoteIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
        updateQuote(currentQuoteIndex);
    });

    // Auto-rotate quotes
    setInterval(() => {
        currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
        updateQuote(currentQuoteIndex);
    }, 8000);
}


// ===== HEADER SCROLL EFFECT =====
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===== MOBILE MENU TOGGLE =====
// ===== MOBILE MENU TOGGLE =====
const mobileToggle = document.getElementById('mobileToggle');
const nav = document.getElementById('nav');

if (mobileToggle && nav) {
    // Create overlay element
    const navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    document.body.appendChild(navOverlay);

    function toggleMenu() {
        mobileToggle.classList.toggle('active');
        nav.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    }

    mobileToggle.addEventListener('click', toggleMenu);
    navOverlay.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
}
// ===== DARK MODE TOGGLE =====
const darkModeToggle = document.getElementById('darkModeToggle');

// Function to update logos based on dark mode
function updateLogos(isDarkMode) {
    const headerLogo = document.querySelector('.logo-img');
    const footerLogo = document.querySelector('.footer-logo-img');
    
    const regularLogo = 'Media/EB2 LOGO.png';
    const whiteLogo = 'Media/EB2 White Logo.png';
    
    if (headerLogo) {
        headerLogo.src = isDarkMode ? whiteLogo : regularLogo;
    }
    if (footerLogo) {
        footerLogo.src = isDarkMode ? whiteLogo : regularLogo;
    }
}

// Only add event listener if toggle button exists
if (darkModeToggle) {
    const toggleIcon = darkModeToggle.querySelector('.toggle-icon');

    // Update icon and logos based on current mode
    if (document.body.classList.contains('dark-mode')) {
        toggleIcon.textContent = '☀️';
        updateLogos(true);
    }

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.documentElement.classList.toggle('dark-mode');

        const isDarkMode = document.body.classList.contains('dark-mode');
        
        if (isDarkMode) {
            toggleIcon.textContent = '☀️';
            localStorage.setItem('darkMode', 'enabled');
        } else {
            toggleIcon.textContent = '🌙';
            localStorage.setItem('darkMode', 'disabled');
        }
        
        // Update logos
        updateLogos(isDarkMode);
    });
}


// ===== FLOATING PARTICLES (OPTIMIZED) =====
const particlesContainer = document.querySelector('.floating-particles');
const particleCount = 20; // Reduced from 30 for better performance

// Create particles with optimized animation
const particleFragment = document.createDocumentFragment();
for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 3 + 1;
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.25);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float ${Math.random() * 8 + 8}s ease-in-out infinite;
        animation-delay: ${Math.random() * 4}s;
        will-change: transform;
    `;
    particleFragment.appendChild(particle);
}
particlesContainer.appendChild(particleFragment);

// Optimized float animation (defined once)
if (!document.getElementById('particle-animation')) {
    const style = document.createElement('style');
    style.id = 'particle-animation';
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translate(0, 0) scale(1);
                opacity: 0.25;
            }
            25% {
                transform: translate(15px, -25px) scale(1.05);
                opacity: 0.4;
            }
            50% {
                transform: translate(-15px, -50px) scale(0.95);
                opacity: 0.25;
            }
            75% {
                transform: translate(20px, -75px) scale(1.02);
                opacity: 0.35;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== TRAVEL INSPIRATION GENERATOR (ENHANCED) =====
const destinations = [
    { city: "Iceland", tip: "Rent a 4x4 to explore the hidden highlands and secret hot springs off the Ring Road.", emoji: "🌋" },
    { city: "Reykjavik, Iceland", tip: "Don't buy bottled water; Iceland's tap water is pristine and delicious.", emoji: "🌋" },
    { city: "Cape Town, South Africa", tip: "Take the cable car up Table Mountain for sunset views you'll never forget.", emoji: "🦁" },
    { city: "Santorini, Greece", tip: "Explore Oia early in the morning for the best photos without the crowds.", emoji: "🏛️" },
    { city: "Banff, Canada", tip: "Rent a canoe at Lake Louise for a magical experience on turquoise waters.", emoji: "🏔️" },
    { city: "Queenstown, New Zealand", tip: "Try the Fergburger, but order online to skip the massive queue.", emoji: "🥝" },
    { city: "Marrakech, Morocco", tip: "Get lost in the medina, but always know where your riad is located.", emoji: "🕌" },
    { city: "Patagonia, Argentina", tip: "Layer your clothing - the weather changes every 20 minutes!", emoji: "🏔️" },
    { city: "Bali, Indonesia", tip: "Wake up early to see the rice terraces without the crowds.", emoji: "🌴" },
    { city: "Dubai, UAE", tip: "Visit the Burj Khalifa at sunset for the best views.", emoji: "🏙️" }
];

const inspireBtn = document.getElementById('inspireBtn');
const inspirationResult = document.getElementById('inspirationResult');
let isAnimating = false;

// Create confetti
function createConfetti() {
    const colors = ['#0984e3', '#00cec9', '#fdcb6e', '#e84393', '#6c5ce7'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -20px;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            opacity: ${Math.random() * 0.7 + 0.3};
            pointer-events: none;
            z-index: 9999;
            animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
            transform: rotate(${Math.random() * 360}deg);
        `;
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 5000);
    }
}

// Add confetti animation
if (!document.getElementById('confetti-animation')) {
    const style = document.createElement('style');
    style.id = 'confetti-animation';
    style.textContent = `
        @keyframes confettiFall {
            to {
                transform: translateY(100vh) rotate(${Math.random() * 720}deg);
                opacity: 0;
            }
        }
        
        @keyframes cardFlip {
            0% {
                transform: rotateY(0deg) scale(1);
            }
            50% {
                transform: rotateY(90deg) scale(0.95);
            }
            100% {
                transform: rotateY(0deg) scale(1);
            }
        }
        
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
        }
        
        @keyframes shimmer {
            0% {
                background-position: -1000px 0;
            }
            100% {
                background-position: 1000px 0;
            }
        }
    `;
    document.head.appendChild(style);
}

if (inspireBtn && inspirationResult) {
    const inspirationIcon = document.querySelector('.inspiration-icon');

    inspireBtn.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;

        // Button animation
        inspireBtn.style.animation = 'pulse 0.3s ease';
        inspireBtn.textContent = '🌍 Spinning the globe...';

        // Add spinning circle animation
        if (inspirationIcon) {
            inspirationIcon.classList.add('spinning-circle');
        }

        // Create confetti
        createConfetti();

        // Show result container immediately for shuffle effect
        inspirationResult.classList.add('active');
        inspirationResult.classList.add('shuffling');

        // Shuffle animation
        let shuffleCount = 0;
        const maxShuffles = 15; // Number of shuffles before stopping
        const shuffleInterval = setInterval(() => {
            const random = destinations[Math.floor(Math.random() * destinations.length)];

            inspirationResult.innerHTML = `
                <div style="position: relative; overflow: hidden; filter: blur(0.5px);">
                    <div style="font-size: 48px; margin-bottom: 12px;">${random.emoji}</div>
                    <h4 style="font-size: 24px; margin-bottom: 8px; color: var(--color-text-muted);">
                        ${random.city}
                    </h4>
                    <p style="font-style: italic; color: var(--color-text-muted); line-height: 1.6;">...</p>
                </div>
            `;

            shuffleCount++;
            if (shuffleCount >= maxShuffles) {
                clearInterval(shuffleInterval);
                showFinalResult();
            }
        }, 100); // Speed of shuffle

        function showFinalResult() {
            const random = destinations[Math.floor(Math.random() * destinations.length)];

            // Stop spinning animation
            if (inspirationIcon) {
                inspirationIcon.classList.remove('spinning-circle');
            }

            // Card flip animation
            inspirationResult.style.animation = 'cardFlip 0.6s ease';
            inspirationResult.classList.remove('shuffling');

            setTimeout(() => {
                inspirationResult.innerHTML = `
                <div style="position: relative; overflow: hidden;">
                    <div style="font-size: 48px; margin-bottom: 12px; animation: pulse 1s ease infinite;">${random.emoji}</div>
                    <h4 style="font-size: 24px; margin-bottom: 8px; background: linear-gradient(135deg, #0984e3, #00cec9);
                        -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                        ${random.city}
                    </h4>
                    <p style="font-style: italic; color: var(--color-text-muted); line-height: 1.6;">"${random.tip}"</p>
                    <div style="position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
                        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                        animation: shimmer 2s ease-in-out;"></div>
                </div>
            `;

                // Reset button
                inspireBtn.textContent = 'Inspire Me Again';
                inspireBtn.style.animation = '';
                isAnimating = false;
            }, 300);
        }
    });
}

// ===== COUNTRY SEARCH & ADD =====
const countrySearchInput = document.getElementById('countrySearch');
const addCountryBtn = document.getElementById('addCountryBtn');
const searchResults = document.getElementById('searchResults');

let selectedCountry = null;

// Search functionality
if (countrySearchInput && searchResults) {
    countrySearchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();

        if (searchTerm.length === 0) {
            searchResults.classList.remove('active');
            selectedCountry = null;
            return;
        }

        const matches = worldCountries.filter(country =>
            country.name.toLowerCase().includes(searchTerm)
        );

        if (matches.length > 0) {
            searchResults.innerHTML = matches.map(country => {
                const isVisited = visitedCountries.includes(country.name);
                return `
                <div class="search-result-item ${isVisited ? 'visited' : ''}" data-country="${country.name}">
                    <span class="result-name">${country.name}</span>
                    <span class="result-badge ${isVisited ? 'visited' : 'not-visited'}">
                        ${isVisited ? '✓ Been' : 'Not visited'}
                    </span>
                </div>
            `;
            }).join('');
            searchResults.classList.add('active');

            // Add click event to results
            document.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent bubbling
                    const countryName = e.currentTarget.dataset.country;

                    // Close dropdown immediately
                    countrySearchInput.value = '';
                    searchResults.classList.remove('active');

                    // Toggle country in map if available
                    try {
                        if (window.worldMap) {
                            window.worldMap.toggleCountry(countryName);
                        }
                    } catch (err) {
                        console.error('Error toggling country:', err);
                    }
                });
            });
        } else {
            searchResults.innerHTML = '<div class="no-results">No countries found</div>';
            searchResults.classList.add('active');
        }
    });
}



// Add country button
if (addCountryBtn && countrySearchInput) {
    addCountryBtn.addEventListener('click', () => {
        if (!selectedCountry) {
            // Try to match exact input
            const inputValue = countrySearchInput.value.trim();
            const exactMatch = worldCountries.find(c =>
                c.name.toLowerCase() === inputValue.toLowerCase()
            );

            if (exactMatch) {
                selectedCountry = exactMatch.name;
            } else {
                // Shake animation for invalid input
                countrySearchInput.style.animation = 'shake 0.5s ease';
                setTimeout(() => {
                    countrySearchInput.style.animation = '';
                }, 500);
                return;
            }
        }

        // Toggle country visited status
        if (visitedCountries.includes(selectedCountry)) {
            visitedCountries = visitedCountries.filter(c => c !== selectedCountry);
            showNotification(`${selectedCountry} removed from visited countries`, 'remove');
        } else {
            visitedCountries.push(selectedCountry);
            showNotification(`${selectedCountry} added to visited countries!`, 'add');
        }

        // Save to localStorage
        localStorage.setItem('visitedCountries', JSON.stringify(visitedCountries));

        // Update counter
        updateVisitedCounter();

        // Dispatch event for React Globe
        window.dispatchEvent(new Event('visitedCountriesUpdated'));

        // Clear input
        countrySearchInput.value = '';
        selectedCountry = null;
        searchResults.classList.remove('active');

        // Add button animation
        addCountryBtn.style.animation = 'pulse 0.3s ease';
        setTimeout(() => {
            addCountryBtn.style.animation = '';
        }, 300);
    });
}

// Close search results when clicking outside
if (countrySearchInput && searchResults && addCountryBtn) {
    document.addEventListener('click', (e) => {
        const isClickInside = countrySearchInput.contains(e.target) ||
            searchResults.contains(e.target) ||
            addCountryBtn.contains(e.target);

        if (!isClickInside) {
            searchResults.classList.remove('active');
        }
    });
}

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = 'country-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 24px;
        padding: 16px 24px;
        background: ${type === 'add' ? '#4CAF50' : '#ff6b6b'};
        color: white;
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-weight: 600;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add shake animation
if (!document.getElementById('shake-animation')) {
    const style = document.createElement('style');
    style.id = 'shake-animation';
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Legacy canvas globe code removed in favor of React Globe component


// Update counter
const visitedCountElement = document.getElementById('visitedCount');

function updateVisitedCounter() {
    if (!visitedCountElement) return;

    const targetCount = visitedCountries.length;
    let currentCount = 0;

    const duration = 2000;
    const startTime = Date.now();

    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        currentCount = Math.floor(easeOutQuart * targetCount);

        visitedCountElement.textContent = currentCount;

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            visitedCountElement.textContent = targetCount;
        }
    }

    animate();
}

// Initial counter animation
const globeSection = document.querySelector('.globe-section');
let hasAnimated = false;

if (globeSection) {
    const globeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                updateVisitedCounter();
                hasAnimated = true;
            }
        });
    }, { threshold: 0.3 });

    globeObserver.observe(globeSection);
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
// ===== GLOBAL ANIMATIONS =====

// 1. Scroll Progress Bar
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = `${scrolled}%`;
});

// 2. Parallax Hero Effect
const heroBackground = document.querySelector('.hero-background');
if (heroBackground) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition < window.innerHeight) {
            heroBackground.style.transform = `translateY(${scrollPosition * 0.4}px)`;
        }
    });
}

// 3. Back to Top Button
const backToTopBtn = document.createElement('button');
backToTopBtn.className = 'back-to-top';
backToTopBtn.innerHTML = '↑';
backToTopBtn.ariaLabel = 'Back to top';
document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== MOBILE FILTER TOGGLE =====
const filterToggle = document.getElementById('filterToggle');
const filterContainer = document.getElementById('mobileFilterContainer');

if (filterToggle && filterContainer) {
    filterToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        
        filterToggle.classList.toggle('active');
        filterContainer.classList.toggle('active');
        
        // Update button text
        const textSpan = filterToggle.querySelector('span:first-child');
        if (textSpan) {
            textSpan.textContent = filterToggle.classList.contains('active') ? 'Hide Filters' : 'Show Filters';
        }
    });
}

// Close filters when a filter option is selected
document.querySelectorAll('.filter-btn, .photo-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (filterToggle && filterContainer && getComputedStyle(filterToggle).display !== 'none') {
             filterToggle.classList.remove('active');
             const textSpan = filterToggle.querySelector('span:first-child');
             if (textSpan) textSpan.textContent = 'Show Filters';
             filterContainer.classList.remove('active');
        }
    });
});

// Close filters when clicking outside
document.addEventListener('click', (e) => {
    if (filterToggle && filterContainer && filterToggle.classList.contains('active')) {
        if (!filterContainer.contains(e.target) && !filterToggle.contains(e.target)) {
            filterToggle.classList.remove('active');
            const textSpan = filterToggle.querySelector('span:first-child');
            if (textSpan) textSpan.textContent = 'Show Filters';
            filterContainer.classList.remove('active');
        }
    }
});

