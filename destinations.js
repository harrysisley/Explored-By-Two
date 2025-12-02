// ===== DESTINATIONS PAGE JAVASCRIPT =====

const destinationsGrid = document.getElementById('destinationsGrid');
const destinationCards = document.querySelectorAll('.destination-card');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');
const viewButtons = document.querySelectorAll('.view-btn');
const noResults = document.getElementById('noResults');

// Filter by continent
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active state
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const continent = button.dataset.continent;
        filterDestinations(continent, searchInput.value);
    });
});

// Search functionality
searchInput.addEventListener('input', (e) => {
    const activeContinent = document.querySelector('.filter-btn.active').dataset.continent;
    filterDestinations(activeContinent, e.target.value);
});

// Filter function
function filterDestinations(continent, searchTerm) {
    let visibleCount = 0;

    destinationCards.forEach((card, index) => {
        const cardContinent = card.dataset.continent;
        const cardName = card.dataset.name.toLowerCase();
        const matchesContinent = continent === 'all' || cardContinent === continent;
        const matchesSearch = cardName.includes(searchTerm.toLowerCase());

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

    // Show/hide no results message
    if (visibleCount === 0) {
        noResults.style.display = 'block';
        noResults.style.animation = 'fadeUp 0.6s ease';
    } else {
        noResults.style.display = 'none';
    }
}

// View toggle (grid/list)
viewButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active state
        viewButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const view = button.dataset.view;

        if (view === 'list') {
            destinationsGrid.classList.add('list-view');
        } else {
            destinationsGrid.classList.remove('list-view');
        }

        // Re-trigger animations
        destinationCards.forEach((card, index) => {
            if (card.style.display !== 'none') {
                card.style.animation = 'none';
                setTimeout(() => {
                    card.style.animation = `fadeUp 0.6s ease forwards ${index * 0.05}s`;
                }, 10);
            }
        });
    });
});

// Card click animation
destinationCards.forEach(card => {
    card.addEventListener('click', function (e) {
        if (!e.target.classList.contains('destination-link')) {
            // Add a subtle pulse animation on click
            this.style.animation = 'pulse 0.3s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
        }
    });
});

// Smooth scroll for map teaser link
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href.includes('#')) {
            const targetId = href.split('#')[1];
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});
