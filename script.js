// Love quotes database
const loveQuotes = [
    { quote: "You are my today and all of my tomorrows.", author: "Ralph Emerson" },
    { quote: "I have crossed oceans of time to find you.", author: "Bram Stoker" },
    { quote: "In all the world, there is no heart for me like yours.", author: "Maya Angelou" },
    { quote: "You are the source of my joy, the center of my world.", author: "Unknown" },
    { quote: "I love you without knowing how, or when, or from where.", author: "Pablo Neruda" },
    { quote: "You are my greatest adventure.", author: "Unknown" },
    { quote: "My heart is and always will be yours.", author: "Jane Austen" },
    { quote: "You make me want to be a better man.", author: "Jack Nicholson" },
    { quote: "I love you more than words could ever express.", author: "Unknown" },
    { quote: "You are everything I never knew I wanted.", author: "Unknown" },
    { quote: "Forever is a long time, but I wouldn't mind spending it by your side.", author: "Unknown" },
    { quote: "You are my greatest blessing and my deepest love.", author: "Unknown" },
    { quote: "I fell in love with you before I even knew your name.", author: "Unknown" },
    { quote: "You are the love of my life.", author: "Unknown" },
    { quote: "With you, I found my home.", author: "Unknown" },
];

// Photo gallery variables
let currentPhotoIndex = 0;
let photos = [];

// Load photos from photos folder
function loadPhotos() {
    const gallery = document.getElementById('photoGallery');
    
    // List of photos that should exist in the photos folder
    const photoNames = [
        'photo1.jpg', 'photo2.jpg', 'photo3.jpg', 'photo4.jpg', 'photo5.jpg',
        'photo6.jpg', 'photo7.jpg', 'photo8.jpg', 'photo9.jpg', 'photo10.jpg',
        'photo11.jpg', 'photo12.jpg'
    ];
    
    let photosLoaded = 0;
    
    // Try to load each photo
    photoNames.forEach((photoName, index) => {
        const photoPath = `photos/${photoName}`;
        const img = new Image();
        
        img.onload = function() {
            photos.push(photoPath);
            photosLoaded++;
            displayPhoto(photoPath);
            
            // Hide no-photos message when first photo loads
            if (photosLoaded === 1) {
                const noPhotosMsg = document.querySelector('.no-photos-message');
                if (noPhotosMsg) {
                    noPhotosMsg.style.display = 'none';
                }
            }
        };
        
        img.onerror = function() {
            // Photo not found, continue
            photosLoaded++;
        };
        
        img.src = photoPath;
    });
}

// Display photo in gallery
function displayPhoto(photoPath) {
    const gallery = document.getElementById('photoGallery');
    
    const item = document.createElement('div');
    item.className = 'gallery-item';
    const photoIndex = photos.length - 1;
    item.innerHTML = `<img src="${photoPath}" alt="Memory" loading="lazy">`;
    item.style.cursor = 'pointer';
    item.onclick = function(e) {
        e.stopPropagation();
        openLightbox(photoIndex);
    };
    
    gallery.appendChild(item);
}

// Lightbox functions
function openLightbox(index) {
    currentPhotoIndex = index;
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox active';
    lightbox.id = 'photoLightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close" onclick="closeLightbox()">✕</span>
            <span class="lightbox-nav lightbox-prev" onclick="previousPhoto()">❮</span>
            <img src="${photos[currentPhotoIndex]}" class="lightbox-image" alt="Memory">
            <span class="lightbox-nav lightbox-next" onclick="nextPhoto()">❯</span>
            <div class="lightbox-counter">${currentPhotoIndex + 1} / ${photos.length}</div>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
    // Close on background click
    lightbox.onclick = function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    };
}

function closeLightbox() {
    const lightbox = document.getElementById('photoLightbox');
    if (lightbox) {
        lightbox.remove();
    }
}

function nextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    const lightbox = document.getElementById('photoLightbox');
    const img = lightbox.querySelector('.lightbox-image');
    const counter = lightbox.querySelector('.lightbox-counter');
    img.src = photos[currentPhotoIndex];
    counter.textContent = `${currentPhotoIndex + 1} / ${photos.length}`;
}

function previousPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    const lightbox = document.getElementById('photoLightbox');
    const img = lightbox.querySelector('.lightbox-image');
    const counter = lightbox.querySelector('.lightbox-counter');
    img.src = photos[currentPhotoIndex];
    counter.textContent = `${currentPhotoIndex + 1} / ${photos.length}`;
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('photoLightbox');
    if (lightbox) {
        if (e.key === 'ArrowRight') {
            nextPhoto();
        } else if (e.key === 'ArrowLeft') {
            previousPhoto();
        } else if (e.key === 'Escape') {
            closeLightbox();
        }
    }
});

// Create background hearts
function createBackgroundHearts() {
    const container = document.getElementById('heartsContainer');
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💞', '💝', '💘'];
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.fontSize = (1 + Math.random() * 2) + 'rem';
        heart.style.animationDelay = Math.random() * 4 + 's';
        heart.style.animationDuration = (3 + Math.random() * 3) + 's';
        container.appendChild(heart);
    }
}

// Create floating hearts continuously
function createFloatingHearts() {
    const container = document.getElementById('floatingHeartsContainer');
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💞', '💝', '💘'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (6 + Math.random() * 6) + 's';
        heart.style.animationDelay = '0s';
        
        container.appendChild(heart);
        
        setTimeout(() => heart.remove(), 13000);
    }, 300);
}

// Show love quote popup
function showLoveQuotePopup() {
    const randomQuote = loveQuotes[Math.floor(Math.random() * loveQuotes.length)];
    
    // Create popup
    const popup = document.createElement('div');
    popup.className = 'quote-popup';
    popup.innerHTML = `
        <div class="quote-popup-content">
            <p class="quote-popup-text">"${randomQuote.quote}"</p>
            <p class="quote-popup-author">- ${randomQuote.author}</p>
            <div class="quote-popup-hearts">💕 💕 💕</div>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // Trigger animation
    setTimeout(() => popup.classList.add('show'), 10);
    
    // Create heart burst effect
    createHeartBurst();
    
    // Auto-close after 4 seconds
    setTimeout(() => {
        popup.classList.remove('show');
        setTimeout(() => popup.remove(), 500);
    }, 4000);
}

// Rotate love quotes
function rotateQuote() {
    const randomQuote = loveQuotes[Math.floor(Math.random() * loveQuotes.length)];
    const quoteElement = document.getElementById('loveQuote');
    const authorElement = document.getElementById('quoteAuthor');
    
    if (quoteElement && authorElement) {
        quoteElement.style.opacity = '0';
        setTimeout(() => {
            quoteElement.textContent = `"${randomQuote.quote}"`;
            authorElement.textContent = `- ${randomQuote.author}`;
            quoteElement.style.transition = 'opacity 0.5s ease';
            quoteElement.style.opacity = '1';
        }, 300);
    }
    
    createHeartBurst();
}

// Create heart burst effect
function createHeartBurst() {
    const container = document.getElementById('floatingHeartsContainer');
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💞', '💝', '💘', '💌'];
    
    for (let i = 0; i < 40; i++) {
        const heart = document.createElement('div');
        heart.className = 'burst-heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        
        const angle = (Math.PI * 2 * i) / 40;
        const distance = 350;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        heart.style.left = window.innerWidth / 2 + 'px';
        heart.style.top = window.innerHeight / 2 + 'px';
        heart.style.setProperty('--tx', tx + 'px');
        heart.style.setProperty('--ty', ty + 'px');
        
        container.appendChild(heart);
        
        setTimeout(() => heart.remove(), 2000);
    }

    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100, 50, 200]);
    }
}

// Create rose effect
function createRoseEffect() {
    const container = document.getElementById('floatingHeartsContainer');
    
    for (let i = 0; i < 50; i++) {
        const rose = document.createElement('div');
        rose.className = 'rose';
        rose.textContent = '🌹';
        
        const angle = Math.random() * Math.PI * 2;
        const distance = 400;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        rose.style.left = window.innerWidth / 2 + 'px';
        rose.style.top = window.innerHeight / 2 + 'px';
        rose.style.setProperty('--tx', tx + 'px');
        rose.style.setProperty('--ty', ty + 'px');
        
        container.appendChild(rose);
        
        setTimeout(() => rose.remove(), 4000);
    }
}

// Click anywhere to create hearts
document.addEventListener('click', (e) => {
    // Only trigger if not clicking a button
    if (e.target.tagName !== 'BUTTON') {
        const container = document.getElementById('floatingHeartsContainer');
        const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💞', '💝'];
        
        for (let i = 0; i < 8; i++) {
            const heart = document.createElement('div');
            heart.className = 'burst-heart';
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            
            const angle = Math.random() * Math.PI * 2;
            const distance = 180;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            heart.style.left = e.clientX + 'px';
            heart.style.top = e.clientY + 'px';
            heart.style.setProperty('--tx', tx + 'px');
            heart.style.setProperty('--ty', ty + 'px');
            
            container.appendChild(heart);
            
            setTimeout(() => heart.remove(), 2000);
        }
    }
});

// Keyboard interactions
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        createHeartBurst();
    } else if (e.key === ' ') {
        e.preventDefault();
        createRoseEffect();
    }
});

// Double click for special effect
document.addEventListener('dblclick', (e) => {
    e.preventDefault();
    const container = document.getElementById('floatingHeartsContainer');
    
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.className = 'burst-heart';
        heart.textContent = '✨';
        
        const angle = Math.random() * Math.PI * 2;
        const distance = 200;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        heart.style.setProperty('--tx', tx + 'px');
        heart.style.setProperty('--ty', ty + 'px');
        
        container.appendChild(heart);
        
        setTimeout(() => heart.remove(), 1500);
    }
});

// Mouse move particle effect
let lastX = 0;
let lastY = 0;

document.addEventListener('mousemove', (e) => {
    lastX = e.clientX;
    lastY = e.clientY;
});

// Initialize on page load
window.addEventListener('load', () => {
    createBackgroundHearts();
    createFloatingHearts();
    loadPhotos();
    
    // Set smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    console.log('%c💕 Welcome to Our Love Story 💕', 'color: #ff69b4; font-size: 20px; font-weight: bold;');
    console.log('%cClick anywhere for hearts!', 'color: #ffb3d9; font-size: 14px;');
    console.log('%cDouble-click for sparkles!', 'color: #ffb3d9; font-size: 14px;');
    console.log('%cPress SPACE for roses!', 'color: #ffb3d9; font-size: 14px;');
    console.log('%cPress ENTER for burst!', 'color: #ffb3d9; font-size: 14px;');
});

// Add scroll animation for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 1s ease-out';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Personalization function
function personalizeMessage(name) {
    const title = document.querySelector('.title');
    const message = document.querySelector('.message');
    const signature = document.querySelector('.signature');
    
    if (title) {
        title.innerHTML = `${name}, I Love You ❤️`;
    }
    
    if (message) {
        message.innerHTML = `${name}, in a world full of ordinary days, you are my favorite. Every moment with you feels like a beautiful dream I never want to wake from. You are not just someone I love—you are everything I love about life itself.`;
    }
    
    if (signature) {
        signature.innerHTML = `Forever yours & madly in love with ${name} 💕`;
    }
}

// Easter egg - type "love" to trigger special effect
let secretCode = '';
document.addEventListener('keypress', (e) => {
    secretCode += e.key.toLowerCase();
    
    if (secretCode.includes('love')) {
        createHeartBurst();
        createRoseEffect();
        secretCode = '';
    }
    
    if (secretCode.length > 10) {
        secretCode = secretCode.slice(-10);
    }
});

// Combined heart effect - all three buttons create hearts!
function createAllHearts() {
    createHeartBurst();
    setTimeout(() => createRoseEffect(), 300);
    setTimeout(() => createFloatingHearts(), 600);
}

// Button event listener - show love quote popup
document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('surpriseBtn');
    
    if (btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            showLoveQuotePopup();
        });
    }
    
    // Photo management
    setupPhotoManagement();
});

// Photo Management UI
function setupPhotoManagement() {
    const gallery = document.getElementById('photoGallery');
    if (!gallery) return;
    
    // Create management controls
    const controls = document.createElement('div');
    controls.className = 'photo-management';
    controls.innerHTML = `
        <div class="photo-controls">
            <button class="btn-add-photo" id="addPhotoBtn">
                ➕ Add Multiple Photos
            </button>
            <p style="color: #ffb3d9; font-size: 0.9rem; margin-top: 10px;">You can select multiple photos at once</p>
            <input type="file" id="photoInput" accept="image/*" multiple style="display: none;">
        </div>
    `;
    
    // Insert controls before gallery
    gallery.parentNode.insertBefore(controls, gallery);
    
    // Add photo button handler
    const addBtn = document.getElementById('addPhotoBtn');
    const fileInput = document.getElementById('photoInput');
    
    addBtn.addEventListener('click', () => {
        fileInput.click();
    });
    
    // Handle file selection - support multiple files
    fileInput.addEventListener('change', (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            let loadedCount = 0;
            
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();
                
                reader.onload = (event) => {
                    addPhotoToGallery(event.target.result, file.name);
                    loadedCount++;
                    
                    // Reset input after all files are loaded
                    if (loadedCount === files.length) {
                        fileInput.value = '';
                    }
                };
                
                reader.readAsDataURL(file);
            }
        }
    });
    
    // Add delete buttons to existing photos
    addDeleteButtonsToPhotos();
}

// Add photo to gallery (client-side)
function addPhotoToGallery(dataUrl, fileName) {
    const gallery = document.getElementById('photoGallery');
    
    // Hide no-photos message
    const noPhotosMsg = gallery.querySelector('.no-photos-message');
    if (noPhotosMsg) {
        noPhotosMsg.style.display = 'none';
    }
    
    // Create gallery item with delete button
    const item = document.createElement('div');
    item.className = 'gallery-item-with-controls';
    
    const img = document.createElement('img');
    img.src = dataUrl;
    img.alt = 'Memory - ' + fileName;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-delete-photo';
    deleteBtn.innerHTML = '✕';
    deleteBtn.title = 'Delete photo';
    
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        item.remove();
        
        // Show no-photos message if gallery is empty
        if (gallery.children.length === 0) {
            const noPhotosMsg = document.createElement('div');
            noPhotosMsg.className = 'no-photos-message';
            noPhotosMsg.innerHTML = '<p>💭 Add your favorite photos to the \'photos\' folder</p>';
            gallery.appendChild(noPhotosMsg);
        }
    });
    
    item.appendChild(img);
    item.appendChild(deleteBtn);
    
    // Add lightbox click
    item.addEventListener('click', (e) => {
        if (e.target !== deleteBtn) {
            const allImages = Array.from(gallery.querySelectorAll('img'));
            const index = allImages.indexOf(img);
            if (index >= 0) {
                openLightboxFromGallery(allImages, index);
            }
        }
    });
    
    gallery.appendChild(item);
}

// Open lightbox from gallery items
function openLightboxFromGallery(images, index) {
    let currentIndex = index;
    
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox active';
    lightbox.id = 'photoLightbox';
    
    const updateLightbox = () => {
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close" onclick="closeLightbox()">✕</span>
                <span class="lightbox-nav lightbox-prev" onclick="previousGalleryPhoto()">❮</span>
                <img src="${images[currentIndex].src}" class="lightbox-image" alt="Memory">
                <span class="lightbox-nav lightbox-next" onclick="nextGalleryPhoto()">❯</span>
                <div class="lightbox-counter">${currentIndex + 1} / ${images.length}</div>
            </div>
        `;
    };
    
    updateLightbox();
    document.body.appendChild(lightbox);
    
    // Store navigation functions
    window.nextGalleryPhoto = () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateLightbox();
    };
    
    window.previousGalleryPhoto = () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLightbox();
    };
    
    // Close on background click
    lightbox.onclick = function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    };
}

// Add delete buttons to existing photos
function addDeleteButtonsToPhotos() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        // Check if delete button already exists
        if (item.querySelector('.btn-delete-photo')) return;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-delete-photo';
        deleteBtn.innerHTML = '✕';
        deleteBtn.title = 'Delete photo';
        
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            item.remove();
            
            const gallery = document.getElementById('photoGallery');
            if (gallery.children.length === 0) {
                const noPhotosMsg = document.createElement('div');
                noPhotosMsg.className = 'no-photos-message';
                noPhotosMsg.innerHTML = '<p>💭 Add your favorite photos or load from the \'photos\' folder</p>';
                gallery.appendChild(noPhotosMsg);
            }
        });
        
        item.appendChild(deleteBtn);
    });
}
