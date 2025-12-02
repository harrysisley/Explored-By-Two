// ===== CONTACT PAGE JAVASCRIPT =====

// Contact Form
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Hide form and show success message
    contactForm.style.display = 'none';
    formSuccess.classList.add('active');

    // Reset form
    setTimeout(() => {
        contactForm.reset();
    }, 500);
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all items
        faqItems.forEach(i => i.classList.remove('active'));

        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Newsletter Form
const newsletterForm = document.getElementById('newsletterForm');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('.newsletter-input');
    const submitBtn = newsletterForm.querySelector('.btn-primary');

    // Show success message
    submitBtn.textContent = '✓ Subscribed!';
    submitBtn.style.background = '#4CAF50';

    setTimeout(() => {
        input.value = '';
        submitBtn.textContent = 'Subscribe';
        submitBtn.style.background = '';
    }, 3000);
});
