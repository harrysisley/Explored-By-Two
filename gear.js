// ===== GEAR PAGE JAVASCRIPT =====

const gearTabs = document.querySelectorAll('.gear-tab');
const gearCategories = document.querySelectorAll('.gear-category');

gearTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const category = tab.dataset.category;

        // Update active tab
        gearTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Show corresponding category
        gearCategories.forEach(cat => {
            if (cat.dataset.category === category) {
                cat.classList.add('active');

                // Re-trigger animations for gear cards
                const gearCards = cat.querySelectorAll('.gear-card');
                gearCards.forEach((card, index) => {
                    card.style.animation = 'none';
                    setTimeout(() => {
                        card.style.animation = `fadeUp 0.6s ease forwards ${index * 0.1}s`;
                    }, 10);
                });
            } else {
                cat.classList.remove('active');
            }
        });

        // Smooth scroll to top of section
        document.querySelector('.gear-section').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});
