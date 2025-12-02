// ===== PASSPORT STAMPS SYSTEM =====

// Country to continent mapping
const countryToContinentMap = {
    // Africa
    'South Africa': 'africa', 'Namibia': 'africa', 'Morocco': 'africa', 'Egypt': 'africa',
    'Kenya': 'africa', 'Tanzania': 'africa', 'Botswana': 'africa', 'Zimbabwe': 'africa',
    'Zambia': 'africa', 'Rwanda': 'africa', 'Uganda': 'africa', 'Ethiopia': 'africa',
    'Madagascar': 'africa', 'Mauritius': 'africa', 'Seychelles': 'africa', 'Tunisia': 'africa',

    // Asia
    'Japan': 'asia', 'Thailand': 'asia', 'Vietnam': 'asia', 'China': 'asia',
    'India': 'asia', 'Indonesia': 'asia', 'Malaysia': 'asia', 'Singapore': 'asia',
    'Philippines': 'asia', 'South Korea': 'asia', 'Cambodia': 'asia', 'Laos': 'asia',
    'Myanmar': 'asia', 'Nepal': 'asia', 'Sri Lanka': 'asia', 'Maldives': 'asia',
    'Bhutan': 'asia', 'Mongolia': 'asia', 'Taiwan': 'asia', 'Hong Kong': 'asia',

    // Europe
    'Iceland': 'europe', 'Greece': 'europe', 'Norway': 'europe', 'United Kingdom': 'europe',
    'France': 'europe', 'Italy': 'europe', 'Spain': 'europe', 'Portugal': 'europe',
    'Germany': 'europe', 'Switzerland': 'europe', 'Austria': 'europe', 'Netherlands': 'europe',
    'Belgium': 'europe', 'Denmark': 'europe', 'Sweden': 'europe', 'Finland': 'europe',
    'Poland': 'europe', 'Czech Republic': 'europe', 'Hungary': 'europe', 'Croatia': 'europe',
    'Ireland': 'europe', 'Scotland': 'europe', 'Wales': 'europe', 'Turkey': 'europe',
    'Türkiye': 'europe', 'Northern Ireland': 'europe', 'Bosnia': 'europe', 'Estonia': 'europe',
    'Albania': 'europe', 'Malta': 'europe', 'Slovakia': 'europe', 'Lithuania': 'europe',
    'Armenia': 'europe', 'Cyprus': 'europe', 'Latvia': 'europe', 'Bulgaria': 'europe',
    'Romania': 'europe', 'Luxembourg': 'europe',

    // Americas
    'Peru': 'americas', 'Argentina': 'americas', 'Canada': 'americas', 'United States': 'americas',
    'USA': 'americas', 'Brazil': 'americas', 'Chile': 'americas', 'Colombia': 'americas',
    'Ecuador': 'americas', 'Bolivia': 'americas', 'Mexico': 'americas', 'Costa Rica': 'americas',
    'Panama': 'americas', 'Cuba': 'americas', 'Jamaica': 'americas', 'Bahamas': 'americas',
    'Barbados': 'americas', 'Uruguay': 'americas', 'Falkland Islands': 'americas',

    // Oceania
    'New Zealand': 'oceania', 'Australia': 'oceania', 'Fiji': 'oceania', 'Samoa': 'oceania',
    'Tonga': 'oceania', 'Vanuatu': 'oceania', 'Papua New Guinea': 'oceania',

    // Polar
    'Antarctica': 'polar', 'Greenland': 'polar'
};

// Continent icons
const continentIcons = {
    'africa': '🦁',
    'asia': '🏯',
    'europe': '🏰',
    'americas': '🏔️',
    'oceania': '🐨',
    'polar': '🐧'
};

// Hardcoded countries for the static section
const hardcodedCountries = [
    "Iceland", "Italy", "Luxembourg", "France", "Greece", "Türkiye", "Netherlands", "Bulgaria", "Romania", "Ireland", "Austria", "Belgium", "Northern Ireland", "Norway", "Finland", "Latvia", "Scotland", "Wales", "USA", "Germany", "Denmark", "Spain", "Poland", "Argentina", "Chile", "Antarctica", "Falkland Islands", "Uruguay", "Sweden", "Bosnia", "Estonia", "Albania", "Malta", "Slovakia", "Hungary", "Mexico", "Croatia", "Lithuania", "Czech Republic", "Armenia", "Cyprus", "Egypt", "Thailand", "Vietnam", "Singapore"
];

// Passport Stamps Manager
class PassportStampsManager {
    constructor() {
        this.dynamicStamps = this.loadDynamicStamps();
        this.init();
    }

    init() {
        // Create modal structure
        this.createModal();

        // Listen for visited countries updates
        window.addEventListener('visitedCountriesUpdated', () => {
            this.syncWithVisitedCountries();
        });

        // Initial sync
        this.syncWithVisitedCountries();
    }

    loadDynamicStamps() {
        try {
            const stored = localStorage.getItem('passportStamps');
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error('Error loading passport stamps:', e);
            return [];
        }
    }

    saveDynamicStamps() {
        try {
            localStorage.setItem('passportStamps', JSON.stringify(this.dynamicStamps));
        } catch (e) {
            console.error('Error saving passport stamps:', e);
        }
    }

    syncWithVisitedCountries() {
        try {
            const visitedCountries = JSON.parse(localStorage.getItem('visitedCountries') || '[]');

            // Add stamps for new countries
            visitedCountries.forEach(country => {
                if (!this.hasDynamicStamp(country)) {
                    this.addDynamicStamp(country, false); // Don't show notification on sync
                }
            });

            // Remove stamps for countries no longer visited
            this.dynamicStamps = this.dynamicStamps.filter(stamp =>
                visitedCountries.includes(stamp.country)
            );

            this.saveDynamicStamps();
            // No need to re-render unless modal is open, but simple to just update if needed
            if (this.modal && this.modal.classList.contains('active') && this.currentMode === 'dynamic') {
                this.renderStamps(this.dynamicStamps);
            }
        } catch (e) {
            console.error('Error syncing stamps:', e);
        }
    }

    hasDynamicStamp(country) {
        return this.dynamicStamps.some(stamp => stamp.country === country);
    }

    addDynamicStamp(country, showNotification = true) {
        const continent = countryToContinentMap[country] || 'europe';
        const stamp = {
            id: Date.now() + Math.random(),
            country: country,
            continent: continent,
            date: new Date().toISOString(),
            dateFormatted: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            })
        };

        this.dynamicStamps.push(stamp);
        this.saveDynamicStamps();

        if (showNotification) {
            this.showStampNotification(stamp);
        }

        if (this.modal && this.modal.classList.contains('active') && this.currentMode === 'dynamic') {
            this.renderStamps(this.dynamicStamps);
        }
    }

    showStampNotification(stamp) {
        const notification = document.createElement('div');
        notification.className = 'stamp-notification';
        notification.innerHTML = this.createStampHTML(stamp, true);

        document.body.appendChild(notification);

        // Trigger animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        // Remove after animation
        setTimeout(() => {
            notification.remove();
        }, 1500);
    }

    createStampHTML(stamp, isNotification = false) {
        const icon = continentIcons[stamp.continent] || '🌍';
        const regionLabel = stamp.continent.charAt(0).toUpperCase() + stamp.continent.slice(1);

        return `
            <div class="passport-stamp ${stamp.continent}" style="${isNotification ? 'width: 250px; height: 250px;' : ''}">
                <div class="stamp-region">${regionLabel}</div>
                <div class="stamp-icon">${icon}</div>
                <div class="stamp-country">${stamp.country}</div>
                ${stamp.dateFormatted ? `<div class="stamp-date">${stamp.dateFormatted}</div>` : ''}
            </div>
        `;
    }

    createModal() {
        const modal = document.createElement('div');
        modal.className = 'passport-modal';
        modal.id = 'passportModal';
        modal.innerHTML = `
            <div class="passport-modal-content">
                <div class="passport-modal-header">
                    <h2 class="passport-modal-title" id="passportModalTitle">
                        <span>📖</span>
                        Passport Collection
                    </h2>
                    <button class="passport-modal-close" id="closePassportModal">×</button>
                </div>
                <div class="passport-stats" id="passportStats"></div>
                <div class="stamps-container" id="stampsContainer"></div>
            </div>
        `;

        document.body.appendChild(modal);
        this.modal = modal;

        // Event listeners
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });

        document.getElementById('closePassportModal').addEventListener('click', () => {
            this.closeModal();
        });

        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    openStaticModal() {
        this.currentMode = 'static';
        this.updateModalTitle("Our Passport Collection");
        
        // Convert hardcoded strings to stamp objects
        const staticStamps = hardcodedCountries.map(country => ({
            country: country,
            continent: countryToContinentMap[country] || 'europe',
            dateFormatted: null
        }));
        
        this.renderStamps(staticStamps);
        this.openModal();
    }

    openDynamicModal() {
        this.currentMode = 'dynamic';
        this.updateModalTitle("Your Travel Passport");
        this.renderStamps(this.dynamicStamps);
        this.openModal();
    }

    updateModalTitle(title) {
        const titleEl = document.getElementById('passportModalTitle');
        if (titleEl) {
            titleEl.innerHTML = `<span>📖</span> ${title}`;
        }
    }

    renderStamps(stamps) {
        const statsContainer = document.getElementById('passportStats');
        const stampsContainer = document.getElementById('stampsContainer');
        
        if (!statsContainer || !stampsContainer) return;

        // Calculate stats
        const totalStamps = stamps.length;
        const continentCounts = {};
        stamps.forEach(stamp => {
            continentCounts[stamp.continent] = (continentCounts[stamp.continent] || 0) + 1;
        });
        const mostVisitedContinent = Object.keys(continentCounts).length > 0 
            ? Object.keys(continentCounts).reduce((a, b) => continentCounts[a] > continentCounts[b] ? a : b)
            : 'none';

        // Update stats
        statsContainer.innerHTML = `
            <div class="passport-stat-card">
                <span class="passport-stat-number">${totalStamps}</span>
                <span class="passport-stat-label">Total Stamps</span>
            </div>
            <div class="passport-stat-card">
                <span class="passport-stat-number">${Object.keys(continentCounts).length}</span>
                <span class="passport-stat-label">Continents</span>
            </div>
            <div class="passport-stat-card">
                <span class="passport-stat-number">${continentIcons[mostVisitedContinent] || '🌍'}</span>
                <span class="passport-stat-label">Most Visited</span>
            </div>
        `;

        // Update stamps grid
        if (stamps.length === 0) {
            stampsContainer.innerHTML = `
                <div class="passport-empty">
                    <div class="passport-empty-icon">📖</div>
                    <h3 class="passport-empty-title">No Stamps Yet</h3>
                    <p class="passport-empty-text">
                        ${this.currentMode === 'dynamic' 
                            ? 'Start adding countries to your visited list to collect passport stamps!' 
                            : 'No stamps found in this collection.'}
                    </p>
                </div>
            `;
        } else {
            // Sort stamps by date (newest first) if date exists, otherwise keep order
            const sortedStamps = [...stamps];
            if (this.currentMode === 'dynamic') {
                sortedStamps.sort((a, b) => new Date(b.date) - new Date(a.date));
            }

            stampsContainer.innerHTML = `
                <div class="stamps-grid">
                    ${sortedStamps.map(stamp => this.createStampHTML(stamp)).join('')}
                </div>
            `;
        }
    }

    openModal() {
        if (this.modal) {
            this.modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal() {
        if (this.modal) {
            this.modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}

// Initialize the passport stamps manager
let passportManager;

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        passportManager = new PassportStampsManager();
        window.passportManager = passportManager; // Make it globally accessible
    });
} else {
    passportManager = new PassportStampsManager();
    window.passportManager = passportManager;
}
