// ===== BLOG PAGE JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', () => {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const category = button.dataset.category;

                // Filter cards with animation
                blogCards.forEach((card, index) => {
                    const cardCategory = card.dataset.category;

                    if (category === 'all' || cardCategory === category) {
                        card.style.display = 'flex';
                        // Reset animation
                        card.style.animation = 'none';
                        card.offsetHeight; /* trigger reflow */
                        card.style.animation = `fadeUp 0.6s ease forwards ${index * 0.05}s`;
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Load More functionality
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            const originalText = loadMoreBtn.textContent;
            loadMoreBtn.textContent = 'Loading...';
            loadMoreBtn.style.opacity = '0.7';
            loadMoreBtn.disabled = true;

            // Simulate loading
            setTimeout(() => {
                loadMoreBtn.textContent = 'No more posts to load';
                loadMoreBtn.style.cursor = 'not-allowed';
                loadMoreBtn.style.background = '#f5f5f5';
                loadMoreBtn.style.color = '#999';
                loadMoreBtn.style.borderColor = 'transparent';
            }, 1500);
        });
    }

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('.newsletter-input');
            const submitBtn = newsletterForm.querySelector('.btn-primary');
            const originalBtnText = submitBtn.textContent;

            // Show success message
            submitBtn.textContent = '✓ Subscribed!';
            submitBtn.style.background = '#4CAF50';
            submitBtn.style.color = 'white';
            input.value = '';

            setTimeout(() => {
                submitBtn.textContent = originalBtnText;
                submitBtn.style.background = '';
                submitBtn.style.color = '';
            }, 3000);
        });
    }

    // Reading Progress Bar (for single post pages)
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + "%";
        });
    }
});
