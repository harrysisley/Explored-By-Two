// ===== PHOTOGRAPHY PAGE JAVASCRIPT =====

const photoFilterBtns = document.querySelectorAll('.photo-filter-btn');
const photoItems = document.querySelectorAll('.photo-item');
const photoCards = document.querySelectorAll('.photo-card');
const lightbox = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxLocation = document.getElementById('lightboxLocation');
const lightboxCaption = document.getElementById('lightboxCaption');

let currentPhotoIndex = 0;
let visiblePhotos = [];

// Filter functionality
photoFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active state
        photoFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.dataset.category;
        filterPhotos(category);
    });
});

function filterPhotos(category) {
    visiblePhotos = [];

    photoItems.forEach((item, index) => {
        const itemCategory = item.dataset.category;

        if (category === 'all' || itemCategory === category) {
            item.style.display = 'block';
            item.style.animation = 'none';
            setTimeout(() => {
                item.style.animation = `fadeUp 0.6s ease forwards ${index * 0.05}s`;
            }, 10);
            visiblePhotos.push(item);
        } else {
            item.style.display = 'none';
        }
    });
}

// Initialize visible photos
filterPhotos('all');

// Lightbox functionality
photoCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        openLightbox(index);
    });
});

function openLightbox(index) {
    currentPhotoIndex = index;
    updateLightbox('open');
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function updateLightbox(direction = 'open') {
    const currentCard = photoCards[currentPhotoIndex];
    const photoImage = currentCard.querySelector('.photo-image');
    const photoInfo = currentCard.querySelector('.photo-info');

    // Set image source
    lightboxImage.innerHTML = ''; // Clear previous content
    const img = document.createElement('img');
    img.src = photoImage.src;
    img.alt = photoImage.alt;
    
    // Apply animation based on direction
    if (direction === 'next') {
        img.classList.add('anim-slide-right');
    } else if (direction === 'prev') {
        img.classList.add('anim-slide-left');
    } else {
        img.classList.add('anim-fade-scale');
    }
    
    lightboxImage.appendChild(img);

    // Update info
    lightboxTitle.textContent = photoInfo.querySelector('.photo-title').textContent;
    lightboxLocation.textContent = photoInfo.querySelector('.photo-location').textContent;
    lightboxCaption.textContent = photoInfo.querySelector('.photo-caption').textContent;
}

function nextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % photoCards.length;
    updateLightbox('next');
}

function prevPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + photoCards.length) % photoCards.length;
    updateLightbox('prev');
}

// Event listeners
lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', nextPhoto);
lightboxPrev.addEventListener('click', prevPhoto);

// Close on background click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowRight') {
        nextPhoto();
    } else if (e.key === 'ArrowLeft') {
        prevPhoto();
    }
});

// Prevent scroll when lightbox is open
lightbox.addEventListener('wheel', (e) => {
    e.preventDefault();
}, { passive: false });
