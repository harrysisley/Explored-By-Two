// ===== DESTINATIONS PAGE JAVASCRIPT =====

const destinationsGrid = document.getElementById('destinationsGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');
const viewButtons = document.querySelectorAll('.view-btn');
const noResults = document.getElementById('noResults');

// Gradients for placeholders
const gradients = [
    'gradient-orange-pink',
    'gradient-blue-teal',
    'gradient-gold-pink',
    'gradient-cyan-purple',
    'gradient-purple-blue',
    'gradient-mint-emerald'
];

// Initialize destinations
function initDestinations() {
    renderDestinations(window.destinationsData);
}

function renderDestinations(data) {
    destinationsGrid.innerHTML = '';
    
    data.forEach((dest, index) => {
        const card = document.createElement('article');
        card.className = 'destination-card';
        card.dataset.continent = dest.continent;
        card.dataset.name = dest.name;
        
        // Pick a gradient based on index if no specific image is provided
        const gradientClass = dest.image ? '' : gradients[index % gradients.length];
        const imageStyle = dest.image ? `background-image: url(${dest.image}); background-size: cover; background-position: center;` : '';
        
        const continentMap = {
            'africa': '🦁 Africa',
            'asia': '🏯 Asia',
            'europe': '🏰 Europe',
            'americas': '🗽 Americas',
            'oceania': '🦘 Oceania',
            'polar': '🐧 Polar'
        };
        const continentTag = continentMap[dest.continent] || dest.continent;
        
        const linkHtml = dest.link 
            ? `<a href="${dest.link}" class="btn-primary" style="padding: 10px 20px; font-size: 0.9rem; width: 100%; text-align: center; display: inline-block;">View Travel Guide →</a>`
            : `<span class="destination-link" style="opacity: 0.7; font-size: 0.9rem; font-weight: 500; color: var(--color-accent);">Travel Guide Coming Soon... ⏳</span>`;
        
        card.innerHTML = `
            <div class="destination-image ${gradientClass}" style="${imageStyle}">
                <div class="placeholder-text">${dest.name}</div>
                <div class="destination-badge">${continentTag}</div>
            </div>
            <div class="destination-content">
                <div class="destination-header">
                    <h3 class="destination-title">${dest.name}</h3>
                </div>
                <p class="destination-description">
                    ${dest.link ? `Discover our complete travel guide for ${dest.name}, including our favorite spots, food recommendations, and budget tips.` : `We're currently crafting a comprehensive downloadable travel guide for ${dest.name}, featuring our full itinerary and local secrets.`}
                </p>
                <div class="destination-meta">
                    <span class="meta-item">📍 ${dest.continent.charAt(0).toUpperCase() + dest.continent.slice(1)}</span>
                </div>
                <div class="destination-link-container" style="margin-top: auto; padding-top: 15px; border-top: 1px solid rgba(var(--color-text-rgb), 0.1);">
                    ${linkHtml}
                </div>
            </div>
        `;

        if (dest.link) {
            card.style.cursor = 'pointer';
            card.onclick = (e) => {
                if (e.target.tagName !== 'A') {
                    window.location.href = dest.link;
                }
            };
        }

        destinationsGrid.appendChild(card);
    });

    // Re-bind search and filters since cards are new
    rebindEvents();
}

function rebindEvents() {
    const cards = document.querySelectorAll('.destination-card');
    
    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const activeContinent = document.querySelector('.filter-btn.active').dataset.continent;
        filterDestinations(activeContinent, e.target.value, cards);
    });

    // Filter by continent
    filterButtons.forEach(button => {
        button.onclick = () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterDestinations(button.dataset.continent, searchInput.value, cards);
        };
    });
}

function filterDestinations(continent, searchTerm, cards) {
    let visibleCount = 0;
    const term = searchTerm.toLowerCase();

    cards.forEach((card, index) => {
        const cardContinent = card.dataset.continent;
        const cardName = card.dataset.name.toLowerCase();
        const matchesContinent = continent === 'all' || cardContinent === continent;
        const matchesSearch = cardName.includes(term);

        if (matchesContinent && matchesSearch) {
            card.style.display = '';
            card.style.animation = 'none';
            setTimeout(() => {
                card.style.animation = `fadeUp 0.6s ease forwards ${index * 0.05}s`;
            }, 10);
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    noResults.style.display = visibleCount === 0 ? 'block' : 'none';
}

// View toggle (grid/list)
viewButtons.forEach(button => {
    button.addEventListener('click', () => {
        viewButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        if (button.dataset.view === 'list') {
            destinationsGrid.classList.add('list-view');
        } else {
            destinationsGrid.classList.remove('list-view');
        }
    });
});

// Initialize on load
document.addEventListener('DOMContentLoaded', initDestinations);
