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
        
        const cardLink = dest.blog ? `onclick="window.location.href='${dest.blog}'"` : '';
        const linkText = dest.blog ? 'Read Guide' : 'Coming Soon';
        const linkIcon = dest.blog ? '→' : '⏳';
        
        card.innerHTML = `
            <div class="destination-image ${gradientClass}" style="${imageStyle}">
                <div class="placeholder-text">${dest.name}</div>
                <div class="destination-badge">${dest.badge}</div>
            </div>
            <div class="destination-content">
                <div class="destination-header">
                    <h3 class="destination-title">${dest.name}</h3>
                    ${dest.blog ? '<div class="destination-rating">★ Guide Live</div>' : ''}
                </div>
                <p class="destination-description">
                    ${dest.blog ? `Check out our full travel guide and stories from our trip to ${dest.name}.` : `We've explored ${dest.name}! We're currently working on the full travel guide for this destination.`}
                </p>
                <div class="destination-meta">
                    <span class="meta-item">📍 ${dest.continent.charAt(0).toUpperCase() + dest.continent.slice(1)}</span>
                </div>
                <div class="destination-link-container" style="margin-top: auto;">
                    <span class="destination-link" style="${!dest.blog ? 'opacity: 0.5; cursor: default;' : ''}">
                        ${linkText} ${linkIcon}
                    </span>
                </div>
            </div>
        `;
        
        if (dest.blog) {
            card.style.cursor = 'pointer';
            card.onclick = () => window.location.href = dest.blog;
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
            card.style.display = 'flex';
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
