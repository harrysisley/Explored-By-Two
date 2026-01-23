// ===== CONTACT PAGE JAVASCRIPT =====

// Contact Form
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const originalBtnText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        const response = await fetch('https://formsubmit.co/ajax/exploredbytwo@hotmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            // Hide form and show success message
            contactForm.style.display = 'none';
            formSuccess.classList.add('active');
            
            // Reset form
            contactForm.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        console.error('Submission error:', error);
        alert('Sorry, there was an error sending your message. Please try again or email us directly.');
        
        // Reset button
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    }
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
